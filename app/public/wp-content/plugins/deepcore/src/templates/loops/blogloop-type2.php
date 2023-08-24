<?php
$deep_options = deep_options();
global $post;
$deep_options['deep_blog_featuredimage_enable'] = isset($deep_options['deep_blog_featuredimage_enable']) ? $deep_options['deep_blog_featuredimage_enable'] : '1' ;
$deep_options['deep_blog_posttitle_enable'] = isset($deep_options['deep_blog_posttitle_enable']) ? $deep_options['deep_blog_posttitle_enable'] : '1' ;
$deep_options['deep_blog_excerpt_list'] = isset($deep_options['deep_blog_excerpt_list']) ? $deep_options['deep_blog_excerpt_list'] : 17 ;
$blog_readmore_text = $deep_options['deep_blog_readmore_text'] ? $deep_options['deep_blog_readmore_text'] : '' ;
$deep_options['deep_blog_meta_date_enable'] = isset( $deep_options['deep_blog_meta_date_enable'] ) ? $deep_options['deep_blog_meta_date_enable'] : '1' ;
$deep_options['deep_blog_meta_category_enable'] = isset( $deep_options['deep_blog_meta_category_enable'] ) ? $deep_options['deep_blog_meta_category_enable'] : '1';
$deep_options['deep_blog_meta_comments_enable'] = isset( $deep_options['deep_blog_meta_comments_enable'] ) ? $deep_options['deep_blog_meta_comments_enable'] : '1';
?>
<article id="post-<?php the_ID(); ?>" <?php post_class('blog-post blgtyp2'); ?>>
<?php
$featured_enable	= $deep_options['deep_blog_featuredimage_enable'];
$post_format		= get_post_format(get_the_ID());
$post_format		= $post_format ? $post_format : 'standard';
$meta_video			= rwmb_meta( 'deep_featured_video_meta' );
$content			= get_the_content();

// Post Thumbnail
if( !empty( $featured_enable ) && $post_format != 'aside' && $post_format != 'quote' && $post_format != 'link' && ( has_post_thumbnail() || !empty( $meta_video ) ) ) {
	$thumbnail_id   = get_post_thumbnail_id();
    $thumbnail_url = get_the_post_thumbnail_url();
    if( !empty( $thumbnail_url ) ) {
        if ( !class_exists( 'Wn_Img_Maniuplate' ) ) {
            require_once DEEP_COMPONENTS_DIR . 'helper-classes/class_webnus_manuplate.php';
        }
        $image = new Wn_Img_Maniuplate;
        $thumbnail_url = $image->m_image( $thumbnail_id , $thumbnail_url , '420' , '330' ); // set required and get result
    }
	?>
	<!-- thumbnail -->
	<div class="col-md-5 alpha">
		<?php
		if( $deep_options['deep_blog_featuredimage_enable'] ) {
			if( 'video'  == $post_format || 'audio'  == $post_format ) {
				$pattern = '\\[' .'(\\[?)' ."(video|audio)" .'(?![\\w-])' .'(' .'[^\\]\\/]*' .'(?:' .'\\/(?!\\])' .'[^\\]\\/]*' .')*?' .')' .'(?:' .'(\\/)' .'\\]' .'|' .'\\]' .'(?:' .'(' .'[^\\[]*+' .'(?:' .'\\[(?!\\/\\2\\])' .'[^\\[]*+' .')*+' .')' .'\\[\\/\\2\\]' .')?' .')' .'(\\]?)';
				preg_match('/'.$pattern.'/s', $post->post_content, $matches);
				if( ( is_array($matches) ) && (isset($matches[3])) && ( ($matches[2] == 'video') || ('audio'  == $post_format)) && ( isset( $matches[2] ) ) ) {
					$video = $matches[0];
					echo do_shortcode($video);
					$content = preg_replace('/'.$pattern.'/s', '', $content);
				} else if( ( ! empty( $meta_video ) ) ) {
					echo do_shortcode( $meta_video );
				}
			} elseif( 'gallery'  == $post_format ) {
				if ( has_block( 'gallery', $post->post_content ) ) {
					$blocks = parse_blocks( get_the_content() );
					foreach ( $blocks as $block ) {
						if ( $block['blockName'] == 'core/gallery' ) {
							wp_kses_post( $block['innerHTML'] );
						}
					}
				} else {
					$pattern = '\\[' .'(\\[?)' ."(gallery)" .'(?![\\w-])' .'(' .'[^\\]\\/]*' .'(?:' .'\\/(?!\\])' .'[^\\]\\/]*' .')*?' .')' .'(?:' .'(\\/)' .'\\]' .'|' .'\\]' .'(?:' .'(' .'[^\\[]*+' .'(?:' .'\\[(?!\\/\\2\\])' .'[^\\[]*+' .')*+' .')' .'\\[\\/\\2\\]' .')?' .')' .'(\\]?)';
					preg_match( '/'.$pattern.'/s', $post->post_content, $matches );
					if( ( is_array( $matches ) ) && ( isset( $matches[3] ) ) && ( $matches[2] == 'gallery' ) && ( isset( $matches[2] ) ) ) {
						$ids		= ( shortcode_parse_atts( $matches[3] ) );
						$ids		= is_array( $ids ) && isset( $ids['ids'] ) ? $ids['ids'] : '';
						$galley_url	= array();
						$galley_id	= explode( ",", $ids );
						?>
						<div class="post-gallery-format">
							<div class="gl-img owl-carousel owl-theme">
								<?php
								for( $i=0; $i < sizeof( $galley_id ); $i++ ) {
									if( !empty( $galley_id[$i] ) ) {
										if ( !class_exists( 'Wn_Img_Maniuplate' ) ) {
											require_once DEEP_COMPONENTS_DIR . 'helper-classes/class_webnus_manuplate.php';
										}
										$image = new Wn_Img_Maniuplate; // instance from settor class
										$thumbnail_url = $image->m_image( $galley_id[$i], wp_get_attachment_url( $galley_id[$i] ) , '1300' , '667' ); // set required and get result
										echo '<img src="' . esc_url( $thumbnail_url ) . '" ' . esc_attr( get_post_meta( $galley_id[$i], '_wp_attachment_image_alt', true ) ) . '>';
									}
								} ?>
							</div>
						</div>
						<?php
					}
				}
			} else {
				if( has_post_thumbnail() ){
					echo '<img src="' . esc_url( $thumbnail_url ) . '" alt="' . esc_attr( get_post_meta( $thumbnail_id, '_wp_attachment_image_alt', true ) ) . '">';
				} else {
					if( $deep_options['deep_no_image'] ){
						echo ! empty( $deep_options['deep_no_image_src']['id'] ) ? '<a href="'.esc_url( get_the_permalink() ).'">' . wp_get_attachment_image($deep_options['deep_no_image_src']['id'], 'full') . '</a>' : '<a href="'.esc_url( get_the_permalink() ).'"><img src="' . esc_url( DEEP_ASSETS_URL ) . 'images/no_image.jpg' . '"></a>';
					}
				}
			}
		}
		?>
	</div>
	<!-- content -->
	<div class="col-md-7 omega">
<?php } else { ?>
	<!-- content -->
	<div class="col-md-12 omega">
<?php } ?>
		<!-- post metadata -->
		<div class="postmetadata">
			<?php
			if( $deep_options['deep_blog_meta_date_enable'] ) { ?>
				<h6 class="blog-date"><i class="ti-calendar"></i><a href="<?php echo esc_url( get_the_permalink() ); ?>"><?php the_time(get_option( 'date_format' )) ?></a></h6>
				<?php
			}
			if( $deep_options['deep_blog_meta_category_enable'] ) { ?>
				<h6 class="blog-cat"><i class="ti-folder"></i><?php the_category(', ') ?> </h6>
				<?php
			}
			if( $deep_options['deep_blog_meta_comments_enable'] ) { ?>
				<h6 class="blog-comments"><a class="hcolorf" href="<?php echo esc_html( get_comments_link() );?>"><i class="ti-comment"></i><?php comments_number(  ); ?></a> </h6>
			<?php } ?>
			<div class="clearfix"></div>
		</div>
		<?php

		// Post Title
		if( $deep_options['deep_blog_posttitle_enable'] && $post_format !='aside' && $post_format !='quote' ) {
			if( 'link' == $post_format ) {
				preg_match('/\b(?:(?:https?|ftp):\/\/|www\.)[-a-z0-9+&@#\/%?=~_|!:,.;]*[-a-z0-9+&@#\/%=~_|]/i', $content,$matches);
				$content = preg_replace('/\b(?:(?:https?|ftp):\/\/|www\.)[-a-z0-9+&@#\/%?=~_|!:,.;]*[-a-z0-9+&@#\/%=~_|]/i','', $content,1);
				$link ='';
				if( isset( $matches[0] ) && is_array( $matches ) ) $link = $matches[0]; ?>
				<h3 class="post-title"><a href="<?php echo esc_url($link); ?>"><?php the_title() ?></a></h3>
			<?php }	else { ?>
				<h3 class="post-title"><a href="<?php the_permalink(); ?>"><?php the_title() ?></a></h3>
			<?php }
		}

		// Post Content
		if( $post_format == 'quote' ) echo '<blockquote>';
		echo '<p>'.esc_html(deep_excerpt(($deep_options['deep_blog_excerpt_list']))?$deep_options['deep_blog_excerpt_list'] : 17 ).'</p>';

		if ( $blog_readmore_text ) {
			echo '<a class="readmore" href="' . get_permalink($post->ID) . '">' . esc_html( $blog_readmore_text ) . '</a>';
		} else {
			echo '<a class="readmore" href="' . get_permalink($post->ID) . '">' . esc_html__('Continue Reading', 'deep') . '</a>';
		}

		if($post_format == 'quote') echo '</blockquote>';
		if($post_format == ('quote') || $post_format == 'aside' )
		echo '<a class="readmore" href="'. esc_url( get_permalink( get_the_ID() ) ) . '">' . esc_html__('View Post', 'deep') . '</a>';
		?>

	</div>
	<hr class="vertical-space1">
</article>