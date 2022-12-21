import CMS from 'netlify-cms-app';
import withEmotion from './withemotion';
import ArticlePreview from './ArticlePreview';


CMS.registerPreviewTemplate('components', withEmotion(ArticlePreview))

CMS.init();

