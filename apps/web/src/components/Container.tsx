import { cn } from "@/lib/cn"
import React from "react"

type ContainerProps = React.ComponentPropsWithoutRef<"div">

const Container: React.FC<ContainerProps> = ({
  children,
  className,
  ...rest
}) => {
  return (
    <div className={cn("md:py-8 px-4 mx-auto max-w-3xl", className)} {...rest}>
      {children}
    </div>
  )
}

export default Container
