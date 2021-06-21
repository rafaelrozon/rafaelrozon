import styled from '@emotion/styled';

export const Input = styled.input`
    box-sizing: border-box;
    width: 100%;
    border-radius: 7px;
    border: 1px solid ${props => props.theme.colors.gray[0]};
    font-size: 1em;
    line-height: 1.5em;
    padding: 0.6em;
`;

export const Message = styled.p`
    font-weight: bold;
    padding: 0;
    margin: 0;
`;

export const Button = styled.input`
    background: ${props => props.theme.colors.secondary};
    color: ${props => props.theme.colors.white};
    border: none;
    padding: 0.5em 1em;
    border-radius: 7px;
    font-size: 1em;
    line-height: 1.5em;
    font-weight: bold;

    &:hover {
        opacity: 0.8;
    }
`;

export const InputErrorMessage = styled.span`
    color: ${props => props.theme.colors.secondary};
    margin: 0.5em 0;
    font-weight: bold;
`;

// Layout
export const Row = styled.div`
    margin-bottom: 0.8em;
`;

export const Col = styled.div`
    margin: ${props => props.theme.space[4]} 0 0;

    &:last-child {
        margin-bottom: 0;
    }

    @media (min-width: 600px) {
        margin: 0 0 ${props => props.theme.space[4]};
    }
`;
