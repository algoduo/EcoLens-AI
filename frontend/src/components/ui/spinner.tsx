import { Loader2Icon } from 'lucide-react'

// Go up two levels to find 'src/lib/utils'
import { cn } from "../../lib/utils"

function Spinner({ className, ...props }: React.ComponentProps<'svg'>) {
  return (
    <Loader2Icon
      role="status"
      aria-label="Loading"
      className={cn('size-4 animate-spin', className)}
      {...props}
    />
  )
}

export { Spinner }
