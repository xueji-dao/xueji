'use client'

import { css } from '@emotion/react'

import {
  Animated,
  Basic,
  BasicExtended,
  bounce,
  Combined,
  ComponentSelectorsExtended,
  globalStyles,
  Pink,
} from './shared/styles'

const Page = () => (
  <div
    css={css`
      display: flex;
      flex-direction: column;
    `}>
    {globalStyles}
    <Basic>Cool Styles</Basic>
    <Pink>Pink text</Pink>
    <Combined>
      With <code>:hover</code>.
    </Combined>
    <Animated animation={bounce}>Let's bounce.</Animated>
    <ComponentSelectorsExtended>
      <BasicExtended>Nested</BasicExtended>
    </ComponentSelectorsExtended>
  </div>
)

export default Page
