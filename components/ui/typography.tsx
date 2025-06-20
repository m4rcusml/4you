import { Text } from 'react-native'

type Props = React.ComponentProps<typeof Text> & {}

export function Typography({ ...rest }: Props) {
  return (
    <Text {...rest} />
  )
}