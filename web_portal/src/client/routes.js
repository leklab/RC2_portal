import React from 'react'
import queryString from 'query-string'
import { hot } from 'react-hot-loader/root'
import { Route, Switch } from 'react-router-dom'
import styled from 'styled-components'

import { HelpButton, HelpModal } from '@broad/help'
import { normalizeRegionId } from '@broad/utilities'

import AboutPage from './AboutPage'
import ContactPage from './ContactPage'
import DownloadsPage from './DownloadsPage'
import ErrorBoundary from './ErrorBoundary'
import FAQPage from './FAQPage'
//import GenePage from './GenePage/GenePage'
import HomePage from './HomePage'
import PageNotFoundPage from './PageNotFoundPage'

//import RegionPageContainer from './RegionPage/RegionPageContainer'
import SearchRedirectPage from './SearchRedirectPage'
import TermsPage from './TermsPage'
//import VariantPage from './VariantPage/VariantPage'

import NavBar from './NavBar'


import { ExpressionPage } from './ExpressionPage/ExpressionPage'
import DiffExpressionPage from './DiffExpressionPage/DiffExpressionPage'
import TrapGenePage from './TrapGenePage/TrapGenePage'
import MetabolicFluxPage from './MetabolicFluxPage/MetabolicFluxPage'
import MetabolomicsPage from './MetabolomicsPage/MetabolomicsPage'


const MainPanel = styled.div`
  width: 100%;
`


const App = () => (
  <div>
    <Route
      path="/"
      render={({ location }) => {
        if (window.gtag) {
          window.gtag('config', window.gaTrackingId, {
            page_path: location.pathname,
          })
        }
        return null
      }}
    />
    <MainPanel>
      <NavBar />
      <ErrorBoundary>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route
            exact
            path="/expression/:variantId"
            render={({ history, location, match }) => {
              const queryParams = queryString.parse(location.search)
              return (
                <ExpressionPage
                  variantId={match.params.variantId}
                />
              )
            }}
          />          
          <Route exact path="/about" component={AboutPage} />
          <Route exact path="/downloads" component={DownloadsPage} />
          <Route exact path="/terms" component={TermsPage} />
          <Route exact path="/contact" component={ContactPage} />
          <Route exact path="/faq" component={FAQPage} />
          <Route exact path="/TrapGenes" component={TrapGenePage} />
          <Route exact path="/diffExpression" component={DiffExpressionPage} />
          <Route exact path="/metabolicflux" component={MetabolicFluxPage} />
          <Route exact path="/metabolomics" component={MetabolomicsPage} />

          <Route
            exact
            path="/awesome"
            render={({ location }) => {
              const params = queryString.parse(location.search)
              return <SearchRedirectPage query={params.query} />
            }}
          />
          <Route component={PageNotFoundPage} />
        </Switch>
      </ErrorBoundary>
    </MainPanel>
    {/*<HelpModal />
    <HelpButton />*/}
  </div>
)

export default hot(App)
