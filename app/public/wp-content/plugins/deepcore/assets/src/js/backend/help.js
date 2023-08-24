window.fwSettings = {
    'widget_id': 47000002173
};
! function () {
    if ("function" != typeof window.FreshworksWidget) {
        var n = function () {
            n.q.push(arguments)
        };
        n.q = [], window.FreshworksWidget = n
    }
}()

const x = document.getElementById("open-ticket");
x.addEventListener("click", function (e) {
    e.preventDefault();
    FreshworksWidget('open', 'ticketForm');
});