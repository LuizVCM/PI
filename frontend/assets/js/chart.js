// Per-level colour palettes. Each breakdown is tinted with shades of its
// parent slice's hue, so drilling reads as "going deeper into this slice".
// Pie/donut drilldown needs object-form data ({ x, y, drilldown }) so each
// slice can carry its own child id; flat numeric series can't.
var deviceColors = ['#406b3cff', '#aaaaaaff'] // Mobile / Desktop / Tablet
var mobileOsColors = ['#0D47A1', '#1976D2', '#64B5F6'] // Mobile by OS
var iosColors = ['#1565C0', '#42A5F5', '#90CAF9'] // iOS versions
var desktopOsColors = ['#1B5E20', '#388E3C', '#66BB6A'] // Desktop by OS
var tabletOsColors = ['#E65100', '#FB8C00'] // Tablet by OS

var options = {
    series: [
        {
            data: [
                
                { x: 'tempo passado', y: 33, drilldown: 'tempo passado' },
                { x: 'restante', y: 12, drilldown: 'restante' },
            ],
        },
    ],
    chart: {
        type: 'donut',
        height: 250,
    },
    colors: deviceColors,
    legend: {
        position: 'bottom',
    },
    dataLabels: {
        enabled: true,
    },
    plotOptions: {
        pie: {
            donut: {
                size: '70%', // tamanho do buraco no centro
                labels: {
                    show: true,
                    total: {
                        show: true,
                        label: 'Total',
                        formatter: function () {
                            return '100%';
                        }
                    }
                }
            },
        },
    },
    title: {
        text: 'TEMPO DE COLHEITA',
        align: 'center',
    },
   
    drilldown: {
        enabled: true,
        breadcrumb: {
            show: true,
            position: 'center',
            rootLabel: 'All Devices',
            separator: ' / ',
        },
        series: [
            {
                id: 'mobile',
                name: 'Mobile by OS',
                colors: mobileOsColors,
                data: [
                    { x: 'iOS', y: 30, drilldown: 'mobile-ios' },
                    { x: 'Android', y: 23 },
                    { x: 'Other', y: 2 },
                ],
            },
            {
                id: 'mobile-ios',
                name: 'iOS Versions',
                colors: iosColors,
                data: [
                    { x: 'iOS 17', y: 18 },
                    { x: 'iOS 16', y: 9 },
                    { x: 'iOS 15', y: 3 },
                ],
            },
            {
                id: 'desktop',
                name: 'Desktop by OS',
                colors: desktopOsColors,
                data: [
                    { x: 'Windows', y: 20 },
                    { x: 'macOS', y: 10 },
                    { x: 'Linux', y: 3 },
                ],
            },
            {
                id: 'tablet',
                name: 'Tablet by OS',
                colors: tabletOsColors,
                data: [
                    { x: 'iPadOS', y: 8 },
                    { x: 'Android', y: 4 },
                ],
            },
        ],
    },
}


var chart = new ApexCharts(document.querySelector('#chart'), options)
chart.render()
