import { useTheme } from "styled-components";
import { formatDistanceToNowStrict } from "date-fns";
import Animated, { BounceInLeft } from "react-native-reanimated";

import { AuthorAndTime, Container, Content, Header, Icons } from "./styles";

import { Text } from "../Text";
import { Divider } from "../Divider";

import { PostData } from "../../@types/Posts";

import TrashSvg from "../../assets/svgs/trash-bin.svg";
import EditSvg from "../../assets/svgs/edit.svg";
import { useAppSelector } from "../../redux/hooks";

interface IPostCard {
  data: PostData;
  onDeletePress: () => void;
  onEditPress: () => void;
}

export const PostsCard = ({ data, onDeletePress, onEditPress }: IPostCard) => {
  const user = useAppSelector((state) => state.user.name);
  const { colors } = useTheme();

  return (
    <Container>
      <Header>
        <Text size={14} weight="700" color={colors.white}>
          {data.title}
        </Text>
        {data.username === user && (
          <Icons>
            <TrashSvg width={24} onPress={onDeletePress} />
            <EditSvg width={24} onPress={onEditPress} />
          </Icons>
        )}
      </Header>
      <Content>
        <AuthorAndTime>
          <Text weight="700" size={14} color={colors.gray_300}>
            @{data.username}
          </Text>
          <Text size={12} color={colors.gray_300}>
            {formatDistanceToNowStrict(new Date(data.created_datetime))} ago
          </Text>
        </AuthorAndTime>
        <Divider top={12} />
        <Text size={14}>{data.content}</Text>
      </Content>
    </Container>
  );
};
