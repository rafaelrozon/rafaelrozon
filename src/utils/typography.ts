import Typography from 'typography';
import theme from 'typography-theme-ocean-beach';

const typography = new Typography({
    ...theme,
    baseFontSize: '18px',
    overrideStyles: () => ({
        a: {
            color: '#141649', // TODO: move this to contstant
            boxShadow: '0 1px 0 0 currentColor',
            textDecoration: 'none',
            backgroundColor: 'transparent'
        },
        'a:hover': {
            boxShadow: 'none'
        },
        h2: {
            marginTop: '3.1rem'
        }
    })
});

const { rhythm: rh, scale } = typography;

export { rh, scale };

export default typography;
