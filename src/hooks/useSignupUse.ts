import * as React from 'react';
import addToMailchimp from 'gatsby-plugin-mailchimp';

function capitalizeFirstLetter(inputStr: string) {
    return inputStr.charAt(0).toUpperCase() + inputStr.slice(1);
}

interface ErrorState {
    msg: string;
}

interface SignUpUserCallback {
    (payload: { firstName: string; email: string }): Promise<boolean>;
}

interface Result {
    result: 'error' | 'success';
    msg: string;
}

interface UseSignUpResponse {
    signUpUser: SignUpUserCallback;
    result: null | Result;
    error: null | ErrorState;
}

const useSignup = (): UseSignUpResponse => {
    const [result, setResult] = React.useState<null | Result>(null);
    const [error, setError] = React.useState<null | ErrorState>(null);

    const signUpUser: SignUpUserCallback = async ({ firstName, email }) => {
        try {
            const response = await addToMailchimp(
                email,
                {
                    FNAME: capitalizeFirstLetter(firstName)
                },
                null
            );
            setResult(response);
            return true;
        } catch (responseError) {
            setError({
                msg: 'Sorry, some error happened.'
            });
            return false;
        }
    };

    return {
        signUpUser,
        result,
        error
    };
};

export default useSignup;
