import { Helmet } from 'react-helmet';

const HelmetProvider = ({ title, description }) => {
    return (
        <Helmet>
            <title>{title}</title>
            <meta name="description" content={description} />
        </Helmet>
    );
};


export default HelmetProvider;