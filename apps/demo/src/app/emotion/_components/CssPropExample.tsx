/** @jsxImportSource @emotion/react */
'use client'

import { useState } from 'react'
import { css } from '@emotion/react'

export const CssPropExample = () => {
  const [isActive, setIsActive] = useState(false)

  return (
    <div
      css={css`
        padding: 16px;
        background: ${isActive ? '#e3f2fd' : '#f5f5f5'};
        border-radius: 8px;
        cursor: pointer;
        transition: all 0.3s ease;

        &:hover {
          background: #e8f5e8;
        }
      `}
      onClick={() => setIsActive(!isActive)}>
      <h3
        css={css`
          margin: 0 0 8px 0;
        `}>
        CSS Prop 示例 {isActive ? '✅' : '⭕'}
      </h3>
      <p
        css={css`
          margin: 0;
          color: #666;
        `}>
        点击切换状态
      </p>
    </div>
  )
}
