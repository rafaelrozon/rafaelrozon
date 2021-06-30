import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
/** @jsx jsx */
import { css, jsx, useTheme } from '@emotion/react';

import useSignup from '../../hooks/useSignupUse';
import { rh } from '../../utils/typography';
import { mq } from '../../utils/theme';
// TODO fix types for styles
import { Input, Row, Col, Button, Message, InputErrorMessage } from './styles';

interface NewsletterProps {
    // TODO: fix typing
    styles?: any;
}

const Newsletter = ({ styles = {} }: NewsletterProps): React.ReactElement => {
    const theme = useTheme();

    const { t } = useTranslation();
    const { signUpUser, error, result } = useSignup();

    const SignupSchema = Yup.object().shape({
        firstName: Yup.string()
            .min(2, t('validationMsgTooShort'))
            .max(50, t('validationMsgTooLong'))
            .required(t('validationMsgRequired')),
        email: Yup.string().email(t('validationMsgInvalidEmail')).required(t('validationMsgRequired'))
    });

    const formik = useFormik({
        validateOnBlur: false,
        validateOnChange: false,
        initialValues: {
            firstName: '',
            email: ''
        },
        onSubmit: signUpUser,
        validationSchema: SignupSchema
    });

    // TODO: create enum for the result value
    const newsletterError = result && result.result === 'error';
    const newsletterSuccess = result && result.result === 'success';
    const msg = result && result.msg;

    return (
        <div
            data-testid="newsletter"
            css={mq(styles, {
                bordeRadius: `${theme.border.radius}`,
                padding: [`${theme.space[5]} ${theme.space[4]}`, theme.space[5]],
                boxShadow: `0 2px 15px 0 rgba(210, 214, 220, 0.5)`
            })}
        >
            <div
                css={mq({
                    marginBottom: rh(1),
                    display: ['block', 'flex']
                })}
            >
                <div
                    css={mq({
                        width: ['100%', '50%']
                    })}
                >
                    <h2
                        css={css`
                            margin: 0 0 ${rh(1)};
                            font-weight: bold;
                        `}
                    >
                        {t('newsletterHeader')}
                    </h2>
                    <p>
                        {t('newsletterCtaFirst')}
                        <span
                            css={mq({
                                display: ['inline-block', 'table']
                            })}
                        >
                            {t('newsletterCtaSecond')}
                        </span>
                    </p>
                </div>

                <form
                    css={mq({
                        margin: 0
                    })}
                    onSubmit={formik.handleSubmit}
                >
                    <Row>
                        <div>
                            <Col>
                                <label htmlFor="firstName">{t('firstName')}</label>
                                <Input
                                    onChange={formik.handleChange}
                                    value={formik.values.firstName}
                                    id="firstName"
                                    data-testid="firstName"
                                    type="text"
                                    name="firstName"
                                    placeholder={t('firstNamePlaceholder')}
                                />
                                {formik.errors.firstName && (
                                    <InputErrorMessage>{formik.errors.firstName}</InputErrorMessage>
                                )}
                            </Col>
                            <Col>
                                <label htmlFor="email">{t('email')}</label>
                                <Input
                                    onChange={formik.handleChange}
                                    value={formik.values.email}
                                    id="email"
                                    data-testid="email"
                                    type="email"
                                    name="email"
                                    placeholder={t('emailPlaceholder')}
                                />
                                {formik.errors.email && <InputErrorMessage>{formik.errors.email}</InputErrorMessage>}
                            </Col>
                        </div>
                    </Row>
                    <Row>
                        <Col>
                            <Button data-testid="submit" type="submit" value={t('subscribe')} />
                        </Col>
                    </Row>
                </form>
            </div>
            <div>
                {error && error.msg && <Message data-testid="generic-error">{error.msg}</Message>}
                {newsletterError && (
                    <Message data-testid="newsletter-error" dangerouslySetInnerHTML={{ __html: msg || '' }} />
                )}
                {newsletterSuccess && (
                    <Message data-testid="newsletter-success" type="success">
                        {msg}
                    </Message>
                )}
            </div>
        </div>
    );
};

export default Newsletter;
