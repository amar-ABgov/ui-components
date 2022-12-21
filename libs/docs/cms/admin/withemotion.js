import { CacheProvider, Global } from '@emotion/core'
import createCache from '@emotion/cache'
import weakMemoize from '@emotion/weak-memoize'
import { ThemeProvider } from 'emotion-theming';
import {
  GoAContainer
} from "@abgov/react-components";

const memoizedCreateCacheWithContainer = weakMemoize((container) => {
  const newCache = createCache({ container })

  return newCache
})

export default (Component) => (props) => {
  const iframe = document.querySelector('#nc-root iframe')
  const iframeHeadElem = iframe && iframe.contentDocument.head

  if (!iframeHeadElem) {
    return null
  }

  return (
    <CacheProvider value={memoizedCreateCacheWithContainer(iframeHeadElem)}>
        <GoAContainer mt='sm'>
          <Component {...props} />
        </GoAContainer>
    </CacheProvider>
  )
}
