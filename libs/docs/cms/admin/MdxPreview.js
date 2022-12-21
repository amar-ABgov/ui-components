import MDX from 'mdx-scoped-runtime';
import * as ABGovComponents from '@abgov/react-components';
import * as StoryBookAddons from '@storybook/addon-docs';
import * as ABGOVCommon from '@abgov/shared/storybook-common';


// Provide custom components for markdown elements
const components = {
  h1: (props) => <h1 style={{ color: 'tomato' }} {...props} />,
};

const MDXPreview = ({ entry }) => {
  return (
    <MDX
      components={components}
      scope={{...ABGovComponents, ABGOVCommon, StoryBookAddons}}
      onError={(error) => console.log(error)}
    >
      {entry.getIn(['data', 'body'])}
    </MDX>
  )
}

export default MDXPreview
