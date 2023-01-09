export const Menu = {
    parts: ['list', 'item', 'groupTitle'],
    baseStyle: {
        list: {
            border: 'none',
            boxShadow: '0px 24px 48px rgba(0, 0, 0, 0.16)',
            outline: '0 !important',
            _focus: {
                boxShadow: '0px 24px 48px rgba(0, 0, 0, 0.16) !important',
            },
        },
        groupTitle: {
            color: 'gray.300',

            textTransform: 'uppercase',
        },
        item: {
            _hover: { background: 'gray.100' },
            _focus: { boxShadow: 'none !important', background: 'gray.100' },
            fontSize: 'sm',
        },
        divider: {
            my: '4',
            borderColor: 'gray.200',
            borderBottom: '1px',
        },
    },
};
