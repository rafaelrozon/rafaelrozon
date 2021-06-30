import { useTranslation } from 'react-i18next';
import { FaRegBookmark } from 'react-icons/fa';

import Link from '../components/Link';
import { icon as iconStyle } from './styles';

interface BookmarkProps {
    onlyText?: boolean;
    url: string;
}

const Bookmark = ({url, onlyText}: BookmarkProps): React.ReactElement => {
    const { t } = useTranslation();
    return (
        <Link
            external
            noDecoration
            byPass
            target="_blank"
            to={`https://getpocket.com/edit?url=${url}`}>
            {
                onlyText ? t("readLater") : <FaRegBookmark css={iconStyle} />

            }
        </Link>
    );
};

export default Bookmark;
