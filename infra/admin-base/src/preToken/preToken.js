
const getPermission = (groups) => {
  const permissions = []
  if (groups.includes(Group.SUPER_ADMIN)) {
    permissions.push("convenio:add", "convenio:list:view");
  }
  if (groups.includes(Group.MODERADOR)) {
    permissions.push("convenio:add", "convenio:list:view");
  }
  if (groups.includes(Group.EQUIPO_LEGAL)) {
    permissions.push("convenio:add", "convenio:list:view");
  }
  return permissions.length > 0 ? [...new Set(permissions)] : undefined
}

export const handler = async (event, context, callback) => {
  context && (context.callbackWaitsForEmptyEventLoop = false);
  console.log(`event: ${JSON.stringify(event, null, 2)}`);
  try {
    const group = getPermission(event.request.groupConfiguration.groupsToOverride);
    const claimsToAddOrOverride = {
      claimsToAddOrOverride: {
        permissions: group ? group.join(',') : undefined
      }
    }
    event.response.claimsOverrideDetails = claimsToAddOrOverride
    console.log(JSON.stringify(event, null, 2))
    callback(null, event);

  } catch (e) {
    console.log(e)
    callback(null)
  }
}
