/* eslint-disable @typescript-eslint/no-empty-interface,@typescript-eslint/no-empty-object-type */
import type {} from '@mui/lab/themeAugmentation'
import type {} from '@mui/x-tree-view/themeAugmentation'
import type {} from '@mui/x-data-grid/themeAugmentation'
import type {} from '@mui/x-date-pickers/themeAugmentation'
import type {} from '@mui/material/themeCssVarsAugmentation'

import type { AvatarExtendColor, AvatarGroupExtendVariant } from './core/components/avatar'
import type { CustomShadows } from './core/custom-shadows'
import type { MixinsExtend } from './core/mixins'
import type { OpacityExtend } from './core/opacity'
import type {
  CommonColorsExtend,
  GreyExtend,
  PaletteColorExtend,
  PaletteExtend,
  TypeBackgroundExtend,
  TypeTextExtend,
} from './core/palette'
import type { TypographyVariantsExtend } from './core/typography'
import type { DeepPartial } from './types'

// ----------------------------------------------------------------------

/* **********************************************************************
 * 🧬 Extend: Core (palette, typography, shadows, mixins...)
 * **********************************************************************/
declare module '@mui/material/styles' {
  /**
   * ➤➤ Palette (https://mui.com/customization/palette/)
   * @from {@link file://./core/palette.ts}
   */
  // primary, secondary, info, success, warning, error
  interface PaletteColor extends PaletteColorExtend {}
  interface SimplePaletteColorOptions extends Partial<PaletteColorExtend> {}

  // text, background, common, grey
  interface Color extends GreyExtend {}
  interface TypeText extends TypeTextExtend {}
  interface CommonColors extends CommonColorsExtend {}
  interface TypeBackground extends TypeBackgroundExtend {}

  // extend palette
  interface Palette extends PaletteExtend {}
  interface PaletteOptions extends DeepPartial<PaletteExtend> {}

  /**
   * ➤➤ Typography (https://mui.com/customization/typography/)
   * @from {@link file://./core/typography.ts}
   */
  interface TypographyVariants extends TypographyVariantsExtend {}
  interface TypographyVariantsOptions extends Partial<TypographyVariantsExtend> {}

  /**
   * ➤➤ Mixins
   * @from {@link file://./core/mixins.ts}
   */
  interface Mixins extends MixinsExtend {}
  interface MixinsOptions extends Partial<MixinsExtend> {}

  /**
   * ➤➤ Opacity
   * @from {@link file://./core/opacity.ts}
   */
  interface Opacity extends OpacityExtend {}

  /**
   * Register the new variant in the `Theme` interface.
   *
   * ➤➤ Custom shadows
   * @from {@link file://./core/custom-shadows.ts}
   *
   */
  interface Theme {
    customShadows: CustomShadows
  }
  interface ThemeOptions {
    customShadows?: Partial<CustomShadows>
  }
  interface ThemeVars {
    customShadows: CustomShadows
  }
}

/* **********************************************************************
 * 🧬 Extend: Components
 * **********************************************************************/

/**
 * ➤➤ Avatar, AvatarGroup (https://mui.com/components/avatars/)
 * @from {@link file://./core/components/avatar.tsx}
 */
declare module '@mui/material/Avatar' {
  interface AvatarOwnProps extends AvatarExtendColor {}
}
declare module '@mui/material/AvatarGroup' {
  interface AvatarGroupPropsVariantOverrides extends AvatarGroupExtendVariant {}
}
