import * as React from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
/** @jsx jsx */
import { css, jsx, useTheme } from '@emotion/react';

import useSignup from '../../hooks/useSignupUse';
import { rh } from '../../utils/typography';
import { Input, Row, Col, Button, Message, InputErrorMessage } from './styles';

const Newsletter = () => {
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

    const newsletterError = result && result.result === 'error';
    const newsletterSuccess = result && result.result === 'success';
    const msg = result && result.msg;

    return (
        <div
            data-testid="newsletter"
            css={css`
                border-radius: ${theme.border.radius};
                padding: ${theme.space[3]};
                box-shadow: 0 2px 15px 0 rgba(210, 214, 220, 0.5);

                @media (min-width: 600px) {
                    padding: ${theme.space[6]};
                }
            `}
        >
            <div
                css={css`
                    display: block;
                    margin-bottom: ${rh(1)};

                    @media (min-width: 600px) {
                        display: flex;
                    }
                `}
            >
                <div
                    css={css`
                        @media (min-width: 600px) {
                            padding-right: ${theme.space[3]};
                        }
                    `}
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
                            css={css`
                                display: inline-block;

                                @media (min-width: 600px) {
                                    display: table;
                                }
                            `}
                        >
                            {t('newsletterCtaSecond')}
                        </span>
                    </p>
                </div>

                <form
                    css={css`
                        margin: 0;
                    `}
                    onSubmit={formik.handleSubmit}
                >
                    <Row>
                        <div>
                            <Col>
                                <label>
                                    {t('firstName')}
                                    <Input
                                        onChange={formik.handleChange}
                                        value={formik.values.firstName}
                                        id="firstName"
                                        data-testid="firstName"
                                        type="text"
                                        name="firstName"
                                        placeholder={t('firstNamePlaceholder')}
                                    />
                                </label>
                                {formik.errors.firstName && (
                                    <InputErrorMessage>{formik.errors.firstName}</InputErrorMessage>
                                )}
                            </Col>
                            <Col>
                                <label>
                                    {t('email')}
                                    <Input
                                        onChange={formik.handleChange}
                                        value={formik.values.email}
                                        id="email"
                                        data-testid="email"
                                        type="email"
                                        name="email"
                                        placeholder={t('emailPlaceholder')}
                                    />
                                </label>
                                {formik.errors.email && <InputErrorMessage>{formik.errors.email}</InputErrorMessage>}
                            </Col>
                        </div>
                    </Row>
                    <Row>
                        <Col>
                            <Button data-testid="submit" type="submit" value={t("subscribe")} />
                        </Col>
                    </Row>
                </form>
            </div>
            <div>
                {error && error.msg && <Message data-testid="generic-error">{error.msg}</Message>}
                {newsletterError && (
                    <Message data-testid="newsletter-error" dangerouslySetInnerHTML={{ __html: msg }} />
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
