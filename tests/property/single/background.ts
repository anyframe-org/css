export const background = {
  background: {
    'bg-red': 'red'
  },
  backgroundColor: {
    'bg-red-500': 'oklch(',
    'bg-white': 'white',
    'bg-current': 'currentColor',
    'bg-inherit': 'inherit',
    'bg-(color:--my-color)': 'var(--my-color)',
    'bg-(color:blue)': 'blue',
    'bg-(color:rgb(255,0,0))': 'rgb(255,0,0)'
  },
  backgroundClip: {
    'bg-clip-text': 'text',
    'bg-clip-border': 'border-box',
    'bg-clip-content': 'content-box',
    'bg-(clip:content-box)': 'content-box'
  },
  backgroundOrigin: {
    'bg-origin-text': 'text',
    'bg-origin-border': 'border-box',
    'bg-origin-content': 'content-box',
    'bg-(origin:content-box)': 'content-box'
  },
  backgroundRepeat: {
    'bg-repeat-x': 'repeat-x',
    'bg-repeat': 'repeat',
    'bg-no-repeat': 'no-repeat',
    'bg-(repeat:no-repeat)': 'no-repeat',
    'bg-(repeat:--h-repeat)': 'var(--h-repeat)'
  },
  backgroundAttachment: {
    'bg-fixed': 'fixed',
    'bg-scroll': 'scroll',
    'bg-(attachment:scroll)': 'scroll'
  },
  backgroundSize: {
    'bg-cover': 'cover',
    'bg-(size:10px_10px)': '10px 10px'
  },
  backgroundPosition: {
    'bg-center': 'center',
    'bg-[top_left]': 'top left',
    'bg-[position:top_left]': 'top left'
  }
}
