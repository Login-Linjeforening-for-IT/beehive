export const getTranslation = (useEng) => {
    if (!useEng)
        return (_, no) => {
        return no;
        };

    return (en, no) => {
        return en ? en : no;
    };
};