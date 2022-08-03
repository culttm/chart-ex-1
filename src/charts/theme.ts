export interface Theme {
    baseColor: string;
    tooltip: {
        initial: {
            color: string;
            bg: string;
        },
        dynamic: {
            color: string;
            bg: string;
        }
    },
    footer: {
        color: string
    }
}

export const themes: Record<string, Theme> = {
    base: {
        baseColor: '#93B6E0',
        tooltip: {
            initial: {
                color: '#A0A0A0',
                bg: '#FAFAFA'
            },
            dynamic: {
                color: '#fff',
                bg: '#656565'
            }
        },
        footer: {
            color: '#656565'
        }
    },
    green: {
        baseColor: '#00C853',
        tooltip: {
            initial: {
                color: '#A0A0A0',
                bg: '#FAFAFA'
            },
            dynamic: {
                color: '#fff',
                bg: '#656565'
            }
        },
        footer: {
            color: '#656565'
        }
    }
}
