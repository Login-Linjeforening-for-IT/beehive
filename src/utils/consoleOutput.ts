export function LogoConsoleOutput() {

    // Looks good in chrome console
    const chromeStr =
        '%c███████╗                              ███████╗\n' +
        '██╔════╝                              ╚════██║\n' +
        '██║%c ██╗     ██████╗  ██████╗ ██╗███╗   ██╗ %c██║\n' +
        '╚═╝%c ██║    ██╔═══██╗██╔════╝ ██║████╗  ██║ %c╚═╝%c\n' +
        '    ██║    ██║   ██║██║  ███╗██║██╔██╗ ██║\n' +
        '    ██║    ██║   ██║██║   ██║██║██║╚██╗██║\n' +
        '%c██╗%c ██████╗╚██████╔╝╚██████╔╝██║██║ ╚████║ %c██╗\n' +
        '██║%c ╚═════╝ ╚═════╝  ╚═════╝ ╚═╝╚═╝  ╚═══╝ %c██║\n' +
        '███████╗%c                              %c███████║\n' +
        '╚══════╝                              ╚══════╝%c\n\n' +
        '       - Laget av TekKom med 🍕 og ❤️'

    const safariStr =
        '\n' +
        '%c███████╗\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t  ███████╗\n' +
        '██╔═════╝\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t╚════██║\n' +
        '██║%c   ██╗\t\t\t\t  ██████╗\t \t ╔██████╗\t  ██╗    \t ███╗ \t\t   ██╗%c\t  ██║\n' +
        '  ╚═╝%c \t██║\t\t\t  ██╔════██╗\t ██╔════╝\t  ██║    \t ████╗\t   ██║%c\t   ╚═╝%c\n' +
        '    \t\t██║\t\t\t  ██║\t\t\t   ██║\t ██║\t  ███╗    ██║\t\t ██╔██╗    ██║\n' +
        '    \t\t██║\t\t\t  ██║\t\t\t   ██║\t ██║\t\t ██║    ██║\t\t ██║╚██╗  ██║\n' +
        '%c██╗%c   ██████╗\t╚██████╝\t\t ╚██████╝\t  ██║      ██║\t\t ╚███║ \t  %c██╗\n' +
        '██║%c\t  ╚═════╝\t\t  ╚════╝\t\t\t\t╚═════╝\t\t   ╚═╝\t\t ╚═╝\t\t  ╚═══╝\t\t  %c██║\n' +
        '███████╗%c\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t %c███████║\n' +
        '   ╚══════╝\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t╚══════╝%c\n\n' +
        '\t\t\t\t\t\t\t\t\t\t\t\t\t- Laget av TekKom med 🍕 og ❤️'

    let str

    if(navigator.userAgent.indexOf('Chrome') != -1) {
        str = chromeStr
    } else if (navigator.userAgent.indexOf('Firefox') != -1) {
        str = chromeStr
    } else if (navigator.userAgent.indexOf('Safari') != -1) {
        str = safariStr
    } else {
        return (console.log('Login - Linjeforeningen for IT'))
    }

    // each string is the CSS to apply for each consecutive %c
    console.log(str,
        // applies orange color
        'color: #fd8738',
        // clears the style for every non orange part
        '',
        'color: #fd8738',
        '',
        'color: #fd8738',
        '',
        'color: #fd8738',
        '',
        'color: #fd8738',
        '',
        'color: #fd8738',
        '',
        'color: #fd8738',
        ''
    )
}
