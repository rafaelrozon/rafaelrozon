import { useTranslation } from 'react-i18next';
/** @jsx jsx */
import { jsx, css } from '@emotion/react';

import formatDateInPT from '../utils/formatDateInPt';
import theme from '../utils/theme';
import { rh } from '../utils/typography';

interface PostMetadataProps {
    date: string;
    timeToRead: string;
}

const postDetails = css`
    color: ${theme.colors.gray[2]};

    &:after {
        content: '·';
        font-size: 2em;
        margin-right: ${rh(1 / 5)};
        padding: 0;
        vertical-align: middle;
    }

    &:last-of-type:after {
        content: '';
    }
`;
const PostMetadata = ({ date, timeToRead }: PostMetadataProps): React.ReactElement => {
    const { t } = useTranslation();
    return (
        <div>
            <small css={postDetails}>{formatDateInPT(date)}</small>
            <small css={postDetails}>{t('timeToRead', { time: timeToRead })}</small>
        </div>
    );
};

export default PostMetadata;
