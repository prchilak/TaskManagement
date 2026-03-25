
const notFoundHandler = (request, response, next) => {

  const { url, } = request;

  const redirectUrls = /^\/(app|login|register|preview)/;

  if (redirectUrls.test(url)) {
    response.redirect(`${request.protocol}://${request.get('host')}/`);
  } else {
    response.status(404).json({
      status: 404,
      message: 'No Route or API Endpoint found',
    });
  }
};

export default notFoundHandler;
