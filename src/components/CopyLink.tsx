import * as React from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { FaLink } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
/** @jsx jsx */
import { jsx, css, useTheme } from '@emotion/react';

import { icon as iconStyle } from './styles';
import { mq } from '../utils/theme';

interface CopyLinkProps {
    text: string;
    styles?: any;
}

const CopyLink = ({ text, styles }: CopyLinkProps): React.ReactElement => {
    const { t } = useTranslation();
    const theme = useTheme();
    const [isCopied, setCopiedState] = React.useState(false);
    const onCopy = () => {
        setCopiedState(true);
        window.setTimeout(() => {
            setCopiedState(false);
        }, 4000);
    };

    const linkIcon = <FaLink fill={theme.colors.primary} css={mq([iconStyle, styles])} />;

    return (
        <CopyToClipboard text={text} onCopy={onCopy}>
            {isCopied ? (
                <span
                    css={css`
                        font-size: 0.8em;
                        display: inline-block;
                    `}
                >
                    {t('copied')}
                </span>
            ) : (
                linkIcon
            )}
        </CopyToClipboard>
    );
};

export default CopyLink;
