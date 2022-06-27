import { Icon } from '@chakra-ui/react'
import { FC, MouseEvent } from 'react'
import { FiHeart } from 'react-icons/fi'


type FavoriteMarkProps = {
  onClick: (e: MouseEvent) => void
  isMarked: boolean
}
const FavoriteMark: FC<FavoriteMarkProps> = ({ onClick, isMarked }) => (
  <Icon
    onClick={onClick}
    aria-label="Add to favorite"
    as={FiHeart}
    boxSize="25px"
    color={isMarked?"red.400":"gray.400"}
    sx={{fill:"currentColor",
  "&:hover":{
    transform:"scale(1.1)"
  }
  }}
     transition="all 0.3s ease"
  />
)

export default FavoriteMark
