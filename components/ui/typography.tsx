import { Text } from 'react-native'

type Props = React.ComponentProps<typeof Text> & {}

export function Typography({ className, ...rest }: Props) {
  return (
    <Text className={className?.concat(' text-foreground')} {...rest} />
  )
}