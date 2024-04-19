import { cn } from "@/lib/cn"
import React from "react"

type ContainerProps = React.ComponentPropsWithoutRef<"div">

const Container: React.FC<ContainerProps> = ({
  className,
  children,
  ...rest
}) => {
  return (
    <div className={cn("max-w-3xl px-4 md:py-8 mx-auto", className)} {...rest}>
      {children}
    </div>
  )
}

export default Container
