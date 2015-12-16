var urlParse = require('url-parse');

// these are the host names which an imgur image could exist on
var validHostNames = [
  'imgur.com',
  'www.imgur.com',
  'i.imgur.com',
  'm.imgur.com'
];

// these are the pages on imgur.com that are in the id namespace but are not ids
var pages = [
  'about',
  'help',
  'blog',
  'tos',
  'privacy',
  'apps',
  'api',
  'advertise',
  'privacy',
  'removalrequest',
  'jobs'
];

function parse(urlString) {
  var urlParseResult = urlParse(urlString);

  // make sure that the url we have been given is actually imgur
  if (validHostNames.indexOf(urlParseResult.hostname) === -1) {
    return null;
  }

  var pathComponents = urlParseResult.pathname.split('/'); // the 0th component is always empty

  if ((pathComponents.length === 3) && (pathComponents[1] === 'gallery')) {
    return {
      type: 'gallery',
      id: pathComponents[2]
    };
  } else if ((pathComponents.length === 4) && (pathComponents[1] === 'r')) {
    return {
      type: 'reddit',
      subreddit: pathComponents[2],
      id: pathComponents[3]
    }
  } else if ((pathComponents.length === 3) && (pathComponents[1] === 'a')) {
    return {
      type: 'album',
      id: pathComponents[2]
    };
  } else if ((pathComponents.length === 2) && (pages.indexOf(pathComponents[1]) === -1)) {
    var nameComponents = pathComponents[1].split('.');
    if (nameComponents.length <= 2) {
      return {
        type: 'image',
        id: nameComponents[0],
        fileType: nameComponents[1]
      };
    } else {
      return null;
    }
  }

  return null;
}

function parsedToImageId(parsedUrl) {
  if (parsedUrl) {
    if (parsedUrl.type === 'gallery' || parsedUrl.type === 'reddit' || parsedUrl.type === 'image') {
      return parsedUrl.id;
    } else if (parsedUrl.type === 'album') {
      // TODO no idea what to do here
      return null;
    }
  }
  return null;
}

function imageIdFromUrl(urlString) {
  return parsedToImageId(parse(urlString));
}

module.exports = {
  _validHostNames: validHostNames,
  _pages: pages,
  parse: parse,
  parsedToImageId: parsedToImageId,
  imageIdFromUrl: imageIdFromUrl
};
