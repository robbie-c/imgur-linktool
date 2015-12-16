var imgurLinkTool = require('./..');

var expect = require('expect.js');

describe('imgur-linktool', function () {
  describe('parse', function () {
    it('should identify galleries', function () {
      var result = imgurLinkTool.parse('imgur.com/gallery/n2Y8i4R');
      expect(result.type).to.be('gallery');
      expect(result.id).to.be('n2Y8i4R');
    });
    it('should identify albums', function () {
      var result = imgurLinkTool.parse('http://imgur.com/a/uAFvn');
      expect(result.type).to.be('album');
      expect(result.id).to.be('uAFvn');
    });
    it ('should reject subreddits', function () {
      var result = imgurLinkTool.parse('http://imgur.com/r/aww');
      expect(result).to.be(null);
    });
    it('should identify subreddit images', function () {
      var result = imgurLinkTool.parse('http://imgur.com/r/aww/iaQrSyX');
      expect(result.type).to.be('reddit');
      expect(result.id).to.be('iaQrSyX');
    });
    it('should identify images', function () {
      var result = imgurLinkTool.parse('http://imgur.com/iaQrSyX');
      expect(result.type).to.be('image');
      expect(result.id).to.be('iaQrSyX');
    });
    it('should identify images with an extension', function () {
      var result = imgurLinkTool.parse('http://imgur.com/iaQrSyX.gif');
      expect(result.type).to.be('image');
      expect(result.id).to.be('iaQrSyX');
    });
    it('should reject other imgur pages', function () {
      var result = imgurLinkTool.parse('http://imgur.com/privacy#adchoices');
      expect(result).to.be(null);
    });
  });
  describe('imageIdFromUrl', function () {
    describe('parse', function () {
      it('should identify galleries', function () {
        var result = imgurLinkTool.imageIdFromUrl('imgur.com/gallery/n2Y8i4R');
        expect(result).to.be('n2Y8i4R');
      });
      it('should reject albums for now', function () {
        var result = imgurLinkTool.imageIdFromUrl('http://imgur.com/a/uAFvn');
        expect(result).to.be(null);
      });
      it ('should reject subreddits', function () {
        var result = imgurLinkTool.imageIdFromUrl('http://imgur.com/r/aww');
        expect(result).to.be(null);
      });
      it('should identify subreddit images', function () {
        var result = imgurLinkTool.imageIdFromUrl('http://imgur.com/r/aww/iaQrSyX');
        expect(result).to.be('iaQrSyX');
      });
      it('should identify images', function () {
        var result = imgurLinkTool.imageIdFromUrl('http://imgur.com/iaQrSyX');
        expect(result).to.be('iaQrSyX');
      });
      it('should identify images with an extension', function () {
        var result = imgurLinkTool.imageIdFromUrl('http://imgur.com/iaQrSyX.gif');
        expect(result).to.be('iaQrSyX');
      });
    });
  })
});


