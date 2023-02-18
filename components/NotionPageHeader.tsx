import * as React from 'react'

import * as types from 'notion-types'
import {IoMoonSharp} from '@react-icons/all-files/io5/IoMoonSharp'
import {IoSunnyOutline} from '@react-icons/all-files/io5/IoSunnyOutline'
import cs from 'classnames'
import {Breadcrumbs, Header, Search, useNotionContext} from 'react-notion-x'

import {isSearchEnabled, navigationLinks, navigationStyle} from '@/lib/config'
import {useDarkMode} from '@/lib/use-dark-mode'

import styles from './styles.module.css'

const ToggleThemeButton = () => {
  const [hasMounted, setHasMounted] = React.useState(false)
  const {isDarkMode, toggleDarkMode} = useDarkMode()

  React.useEffect(() => {
    setHasMounted(true)
  }, [])

  const onToggleTheme = React.useCallback(() => {
    toggleDarkMode()
  }, [toggleDarkMode])

  return (
    <div
      className={cs('breadcrumb', 'button', !hasMounted && styles.hidden)}
      onClick={onToggleTheme}
    >
      {hasMounted && isDarkMode ? <IoMoonSharp/> : <IoSunnyOutline/>}
    </div>
  )
}

export const NotionPageHeader: React.FC<{
  block: types.CollectionViewPageBlock | types.PageBlock
}> = ({block}) => {
  const [toggleMobileHeader, setToggleMobileHeader] = React.useState(false)

  const {components, mapPageUrl} = useNotionContext()

  const onToggleMobileHeader = () => {
    setToggleMobileHeader(!toggleMobileHeader)
  }

  if (navigationStyle === 'default') {
    return <Header block={block}/>
  }
  const renderMenuMobile = () => {
    if (toggleMobileHeader) {
      return (
        <div className='notion-nav-header-mobile mobile-display'>
          <div className='nav-content'>
            {navigationLinks
              ?.map((link, index) => {
                if (!link.pageId && !link.url) {
                  return null
                }

                if (link.pageId) {
                  return (
                    <components.PageLink
                      href={mapPageUrl(link.pageId)}
                      key={index}
                      className={cs(styles.navLink, 'breadcrumb', 'button')}
                    >
                      {link.title}
                    </components.PageLink>
                  )
                } else {
                  return (
                    <components.Link
                      href={link.url}
                      key={index}
                      className={cs(styles.navLink, 'breadcrumb', 'button')}
                    >
                      {link.title}
                    </components.Link>
                  )
                }
              })
              .filter(Boolean)}

            <ToggleThemeButton/>

            {isSearchEnabled && <Search block={block} title={null}/>}
          </div>
        </div>
      )
    } else {
      return (
        <></>
      )
    }
  }

  const renderButtonMobileMenu = () => {
    if (toggleMobileHeader) {
      return (
        <button className='button-menu' onClick={onToggleMobileHeader}>
          <img alt="button menu"
               src='data:image/svg+xml;base64,PHN2ZyBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGZpbGwtcnVsZT0iZXZlbm9kZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgc3Ryb2tlLW1pdGVybGltaXQ9IjIiIHZpZXdCb3g9IjAgMCAyNCAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJtMTIgMTAuOTMgNS43MTktNS43MmMuMTQ2LS4xNDYuMzM5LS4yMTkuNTMxLS4yMTkuNDA0IDAgLjc1LjMyNC43NS43NDkgMCAuMTkzLS4wNzMuMzg1LS4yMTkuNTMybC01LjcyIDUuNzE5IDUuNzE5IDUuNzE5Yy4xNDcuMTQ3LjIyLjMzOS4yMi41MzEgMCAuNDI3LS4zNDkuNzUtLjc1Ljc1LS4xOTIgMC0uMzg1LS4wNzMtLjUzMS0uMjE5bC01LjcxOS01LjcxOS01LjcxOSA1LjcxOWMtLjE0Ni4xNDYtLjMzOS4yMTktLjUzMS4yMTktLjQwMSAwLS43NS0uMzIzLS43NS0uNzUgMC0uMTkyLjA3My0uMzg0LjIyLS41MzFsNS43MTktNS43MTktNS43Mi01LjcxOWMtLjE0Ni0uMTQ3LS4yMTktLjMzOS0uMjE5LS41MzIgMC0uNDI1LjM0Ni0uNzQ5Ljc1LS43NDkuMTkyIDAgLjM4NS4wNzMuNTMxLjIxOXoiLz48L3N2Zz4='/>
        </button>
      )
    } else {
      return (
        <button className='button-menu' onClick={onToggleMobileHeader}>
          <img alt="button menu"
               src='data:image/svg+xml;base64,PHN2ZyBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGZpbGwtcnVsZT0iZXZlbm9kZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgc3Ryb2tlLW1pdGVybGltaXQ9IjIiIHZpZXdCb3g9IjAgMCAyNCAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJtMTEgMTYuNzQ1YzAtLjQxNC4zMzYtLjc1Ljc1LS43NWg5LjVjLjQxNCAwIC43NS4zMzYuNzUuNzVzLS4zMzYuNzUtLjc1Ljc1aC05LjVjLS40MTQgMC0uNzUtLjMzNi0uNzUtLjc1em0tOS01YzAtLjQxNC4zMzYtLjc1Ljc1LS43NWgxOC41Yy40MTQgMCAuNzUuMzM2Ljc1Ljc1cy0uMzM2Ljc1LS43NS43NWgtMTguNWMtLjQxNCAwLS43NS0uMzM2LS43NS0uNzV6bTQtNWMwLS40MTQuMzM2LS43NS43NS0uNzVoMTQuNWMuNDE0IDAgLjc1LjMzNi43NS43NXMtLjMzNi43NS0uNzUuNzVoLTE0LjVjLS40MTQgMC0uNzUtLjMzNi0uNzUtLjc1eiIgZmlsbC1ydWxlPSJub256ZXJvIi8+PC9zdmc+'/>
        </button>
      )
    }
  }

  return (
    <div className='notion-nav-header-wrapper'>
      <header className='notion-header'>
        <div className='notion-nav-header'>
          <Breadcrumbs block={block} rootOnly={true}/>

          <div className='notion-nav-header-rhs breadcrumbs desktop-display'>
            {navigationLinks
              ?.map((link, index) => {
                if (!link.pageId && !link.url) {
                  return null
                }

                if (link.pageId) {
                  return (
                    <components.PageLink
                      href={mapPageUrl(link.pageId)}
                      key={index}
                      className={cs(styles.navLink, 'breadcrumb', 'button')}
                    >
                      {link.title}
                    </components.PageLink>
                  )
                } else {
                  return (
                    <components.Link
                      href={link.url}
                      key={index}
                      className={cs(styles.navLink, 'breadcrumb', 'button')}
                    >
                      {link.title}
                    </components.Link>
                  )
                }
              })
              .filter(Boolean)}

            <ToggleThemeButton/>

            {isSearchEnabled && <Search block={block} title={null}/>}
          </div>
          <div className='mobile-display'>{renderButtonMobileMenu()}</div>
        </div>
      </header>
      {renderMenuMobile()}
    </div>
  )
}
