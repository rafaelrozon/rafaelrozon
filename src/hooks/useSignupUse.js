import * as React from 'react';
import addToMailchimp from 'gatsby-plugin-mailchimp';

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}


const useSignup = () => {
    const [result, setResult] = React.useState(null);
    const [error, setError] = React.useState(false);

    const signUpUser = async ({ firstName, email }) => {
        try {
            const response = await addToMailchimp(
                email,
                {
                    FNAME: capitalizeFirstLetter(firstName),
                },
                null
            );
            setResult(response);
            return true;
        } catch (responseError) {
            setError({
                error: {
                    msg: 'Sorry, some error happened.'
                }
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
