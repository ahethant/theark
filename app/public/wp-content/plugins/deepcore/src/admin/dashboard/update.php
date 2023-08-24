<?php
/**
 * Deep Update.
 *
 * @package Deep
 */

namespace Deep\Admin;

defined( 'ABSPATH' ) || exit;

/**
 * Class Update.
 */
final class Update {

	/**
	 * Instance of this class.
	 *
	 * @since   5.2.0
     *
	 * @access  public
     *
	 * @var     Update
	 */
	public static $instance;

	/**
	 * Provides access to a single instance of a module using the singleton pattern.
	 *
	 * @since   5.2.0
     *
	 * @return  object
	 */
	public static function get_instance() {
		if ( self::$instance === null ) {
			self::$instance = new self();
		}
		return self::$instance;
	}

	/**
	 * Constructor.
	 *
	 * @since 5.2.0
     *
	 * @access private
	 */
	private function __construct() {
        $this->hooks();
	}

    /**
	 * Hooks.
	 *
	 * @since 5.2.0
     *
	 * @access private
	 */
    private function hooks() {
		add_action( 'deep/dashboard/update', array( $this, 'update_message' ) );
        add_action( 'wp_ajax_custom_update', array( $this, 'custom_update' ) );
		add_action( 'wp_ajax_nopriv_custom_update', array( $this, 'custom_update' ) );
	}

    /**
	 * Returns the latest update version of Deep theme.
	 *
	 * @since 5.2.0
     *
	 * @access private
	 */
    private function deep_theme_update() {
		global $wp_version;

		$request = array(
			'active' => 'deep',
			'themes' => array(
				'deep' => array(
					'Name'       => 'Deep',
					'Title'      => 'Deep',
					'Version'    => \Deep_Admin::theme( 'version' ),
					'Author'     => 'WEBNUS',
					'Author URI' => 'https://webnus.net',
					'Template'   => 'deep',
					'Stylesheet' => 'deep',
				)
			)
		);

		$url = 'http://api.wordpress.org/themes/update-check/1.1/';

		$options = array(
			'timeout'    => 30,
			'body'       => array(
				'themes' => wp_json_encode( $request ),
			),
			'user-agent' => 'WordPress/' . $wp_version . '; ' . home_url( '/' ),
		);

		$raw_response = wp_remote_post( $url, $options );
		$response     = json_decode( wp_remote_retrieve_body( $raw_response ), true );
        $new_version  = isset( $response['themes']['deep']['new_version'] ) ? $response['themes']['deep']['new_version'] : \Deep_Admin::theme( 'version' );

		return $new_version;
	}

    /**
	 * Returns the latest update version of Deep Core.
	 *
	 * @since 5.2.0
     *
	 * @access private
	 */
    private function deep_core_update() {
        global $wp_version;

        $plugin = array(
            'plugins' => array(
                'deepcore/deepcore.php' => array(
                    'Name'        => 'Deep Core',
                    'PluginURI'   => 'https://webnus.net/deep-wordpress-theme/',
                    'Version'     =>  DEEP_VERSION,
                    'Description' => 'Deep theme core functions.',
                    'Author'      => 'Webnus',
                    'AuthorURI'   => 'https://webnus.net/',
                    'Title'       => 'Deep Core',
                    'AuthorName'  => 'Webnus'
                )
            )
        );

        $url = 'http://api.wordpress.org/plugins/update-check/1.1/';

        $options = array(
            'timeout'    => 30,
            'body'       => array(
                'plugins' => wp_json_encode( $plugin ),
                'all'     => wp_json_encode( true ),
            ),
            'user-agent' => 'WordPress/' . $wp_version . '; ' . home_url( '/' ),
        );

        $raw_response = wp_remote_post( $url, $options );
        $response     = json_decode( wp_remote_retrieve_body( $raw_response ), true );
        $new_version  = isset( $response['plugins']['deepcore/deepcore.php']['new_version'] ) ? $response['plugins']['deepcore/deepcore.php']['new_version'] : DEEP_VERSION;

        return $new_version;
    }

    /**
	 * Check if a new update is available for Deep theme.
	 *
	 * @since 5.2.0
     *
	 * @access public
	 */
    public function is_update_available_deep_theme() {

        if ( $this->deep_theme_update() > \Deep_Admin::theme( 'version' ) ) {
            return true;
        }

        return false;
    }

    /**
	 * Check if a new update is available for Deep Core.
	 *
	 * @since 5.2.0
     *
	 * @access public
	 */
    public function is_update_available_deep_core() {

        if ( $this->deep_core_update() > DEEP_VERSION ) {
            return true;
        }

        return false;
    }

    /**
	 * Update message.
	 *
	 * @since 5.2.0
     *
	 * @access public
	 */
    public function update_message() {
        if ( false === $this->is_update_available_deep_theme() && false === $this->is_update_available_deep_core() ) {
            return;
        }

        if ( current_user_can( 'manage_options' ) ) :
        ?>
            <div class="w-row">
                <div class="w-col-sm-12">
                    <div class="update-now-box">
                        <?php esc_html_e( 'New update available', 'deep' ); ?>
                        <span class="w-button">
                            <a href="#" id="custom_update"><?php esc_html_e( 'Update now', 'deep' ); ?></a>
                        </span>
                    </div>
                </div>
            </div>
        <?php
        endif;
    }

    /**
	 * Custom update ajax.
	 *
	 * @since 5.2.0
     *
	 * @access public
	 */
    public function custom_update() {

        if ( ! wp_verify_nonce( $_POST['nonce'], 'one_demo_importer' ) ) {
            wp_send_json_error( array(
                'message' => __( 'Wrong nonce' ),
            ), 403 );

            wp_die();
        }

        if ( ! current_user_can( 'manage_options' ) ) {
            wp_send_json_error( array(
                'message' => __( 'Sorry, you are not allowed to update the files.' ),
            ), 403 );

            wp_die();
        }

        require_once ABSPATH . 'wp-admin/includes/class-wp-upgrader.php';

        if ( $this->is_update_available_deep_theme() ) {
            $this->theme_update();
        }

        if ( $this->is_update_available_deep_core() ) {
            $this->plugin_update();
        }

        wp_die();
    }

    /**
	 * Update Deep theme by WP_Automatic_Updater.
	 *
	 * @since 5.2.0
     *
	 * @access private
	 */
    private function theme_update() {
        $theme_updater     = new \WP_Automatic_Updater();
        $theme             = new \stdClass();
        $theme->theme      = 'deep';
        $theme->autoupdate = true;

        $theme_updater->update( 'theme', $theme );
    }

    /**
	 * Update Deep Core plugin by WP_Automatic_Updater.
	 *
	 * @since 5.2.0
     *
	 * @access private
	 */
    private function plugin_update() {
        $plugin_updater     = new \WP_Automatic_Updater();
        $plugin             = new \stdClass();
        $plugin->plugin     = 'deepcore/deepcore.php';
        $plugin->autoupdate = true;

        $plugin_updater->update( 'plugin', $plugin );
    }
}

Update::get_instance();
