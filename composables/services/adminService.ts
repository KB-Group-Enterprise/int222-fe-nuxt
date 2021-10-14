import { useMutation, useQuery } from '@vue/apollo-composable/dist';
import UserQuery from '@/graphql/queries/users.gql';
import { ref, Ref, useContext, watch } from '@nuxtjs/composition-api';
import UpdateRoleMutation from '@/graphql/mutations/updateRole.gql';
import { UpdateRoleInput, User } from '~/types/types';
export function fetchUsers() {
  const users = ref<User[]>([]);
  const fetchAllUsers = () => {
    const { $toast } = useContext();
    const { onResult, onError } = useQuery(UserQuery);
    onResult((result) => {
      users.value = result.data.users as User[];
    });
    onError((error) => {
      if (error) $toast.error(error.message);
    });
  };
  return {
    users,
    fetchAllUsers,
  };
}
export function updateRole(selectedRole: Ref<string>, userId: string) {
  const {
    mutate: updateRole,
    onError,
    onDone,
  } = useMutation(UpdateRoleMutation);
  const { $toast } = useContext();
  watch(selectedRole, () => {
    const payload: UpdateRoleInput = {
      role: selectedRole.value,
      userId,
    };
    updateRole({
      updateRoleData: payload,
    });
  });
  onDone((result) => {
    if (result.data.updateRole === true)
      $toast.success('Update Role Completed');
  });
  onError((error) => {
    if (error) $toast.error(error.message);
  });
}
