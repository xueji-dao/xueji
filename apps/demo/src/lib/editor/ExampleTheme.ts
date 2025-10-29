import { type EditorThemeClasses } from 'lexical'

import { cn } from '@/lib/utils'

const checklistItemCommonClasses = cn(
  'relative block min-h-[1.5em] list-none px-[1.5em] outline-none [&]:mx-[0.5em]',
  'before:absolute before:top-0.5 before:left-0 before:block before:h-4 before:w-4 before:cursor-pointer before:rounded-sm before:border before:border-solid before:bg-transparent',
  'rtl:before:right-0 rtl:before:left-auto',
  'focus:before:shadow-[0_0_0_2px_#a6cdfe]',
)

const listCommonClasses = 'p-0 m-0 list-outside'

const theme: EditorThemeClasses = {
  code: 'editor-code',
  heading: {
    h1: 'text-2xl text-[rgb(5,5,5)] font-normal m-0 mb-3 p-0',
    h2: 'text-[15px] text-[rgb(101,103,107)] font-bold m-0 mt-[10px] p-0 uppercase',
    h3: 'text-lg text-[rgb(5,5,5)] font-semibold m-0 mb-2 p-0',
    h4: 'text-base text-[rgb(5,5,5)] font-semibold m-0 mb-[6px] p-0',
    h5: 'text-sm text-[rgb(5,5,5)] font-semibold m-0 mb-1 p-0',
  },
  hr: cn(
    'mx-0 my-[1em] cursor-pointer border-none p-0.5',
    `after:block after:h-[2px] after:bg-[#ccc] after:leading-[2px] after:content-['']`,
  ),
  hrSelected: 'outline-[2px] outline-solid outline-[rgb(60,132,244)]',
  image: 'max-w-full h-auto block my-2',
  link: 'text-[rgb(33,111,219)] no-underline',
  list: {
    checklist: '',
    listitem: cn(
      'mx-8 my-0',
      'bg-(--listitem-marker-background-color) font-(family-name:--listitem-marker-font-family) text-(length:--listitem-marker-font-size)',
      'marker:bg-(--listitem-marker-background-color) marker:font-(family-name:--listitem-marker-font-family) marker:text-(length:--listitem-marker-font-size) marker:text-(--listitem-marker-color)',
    ),
    listitemChecked: cn(
      checklistItemCommonClasses,
      'line-through',
      'before:border-[rgb(61,135,245)] before:bg-[#3d87f5] before:bg-no-repeat',
      'after:absolute after:inset-x-[5px] after:top-1 after:block after:h-2.5 after:w-[6px] after:rotate-45 after:cursor-pointer after:border-t-0 after:border-r-[1px] after:border-b-[1px] after:border-l-0 after:border-solid after:border-white',
    ),
    listitemUnchecked: cn(checklistItemCommonClasses, 'before:border-[#999]'),
    nested: {
      listitem: cn('list-none', 'before:hidden', 'after:hidden'),
    },
    ol: cn(listCommonClasses, 'ml-5', 'list-decimal'),
    olDepth: [
      cn(listCommonClasses, 'ml-5', 'list-decimal'),
      cn(listCommonClasses, 'ml-5', 'list-[upper-alpha]'),
      cn(listCommonClasses, 'ml-5', 'list-[lower-alpha]'),
      cn(listCommonClasses, 'ml-5', 'list-[upper-roman]'),
      cn(listCommonClasses, 'ml-5', 'list-[lower-roman]'),
    ],
    ul: cn(listCommonClasses, 'ml-5', 'list-disc'),
  },
  paragraph: 'm-0 mb-2 relative last:mb-0',
  placeholder:
    'text-[#999] overflow-hidden absolute text-ellipsis top-[15px] left-[10px] text-[15px] select-none inline-block pointer-events-none',
  quote: 'm-0 ml-5 mb-2.5 text-[15px] text-gray-500 border-slate-300 border-l-4 border-solid pl-4',
  table: 'border-collapse border-spacing-0 overflow-scroll table-fixed w-max mt-0 mr-[25px] mb-[30px] ml-0',
  tableCell:
    'border border-solid border-[#bbb] w-[75px] min-w-[75px] align-top text-start py-[6px] px-2 relative outline-none',
  tableCellEditing: 'shadow-[0_0_5px_rgba(0,0,0,0.4)] rounded-[3px]',
  tableCellActionButton: 'bg-[#eee] block border-0 rounded-[20px] w-5 h-5 text-[#222] cursor-pointer hover:bg-[#ddd]',
  tableCellActionButtonContainer: 'block right-[5px] top-[6px] absolute z-[4] w-5 h-5',
  tableCellHeader: 'bg-[#f2f3f5] text-start',
  tableCellResizer: 'absolute -right-1 h-full w-2 cursor-ew-resize z-10 top-0',
  tableCellResizeRuler: 'block absolute w-px bg-[rgb(60,132,244)] h-full top-0',
  tableCellSelected:
    'caret-transparent after:absolute after:left-0 after:right-0 after:bottom-0 after:top-0 after:bg-[highlight] after:mix-blend-multiply after:content-[""] after:pointer-events-none',
  tableSelected: 'outline outline-2 outline-[rgb(60,132,244)]',
  tableSelection: '[&_*::selection]:bg-transparent',
  text: {
    bold: 'font-bold',
    capitalize: 'capitalize',
    code: 'font-mono text-[94%] py-px px-1 bg-slate-100',
    hashtag: 'text-[#1976d2] font-medium',
    highlight: 'bg-[rgba(255,212,0,0.14)] border-solid border-b-[2px] border-[rgba(255,212,0,0.3)]',
    italic: 'italic',
    lowercase: 'lowercase',
    overflowed: 'overflow-hidden text-ellipsis',
    strikethrough: 'line-through',
    subscript: 'text-[0.8em] !align-sub',
    superscript: 'text-[0.8em] align-super',
    underline: 'underline',
    underlineStrikethrough: '[text-decoration:underline_line-through]',
    uppercase: 'uppercase',
  },
}

export default theme
