
const getPermission = (groups) => {
  const permissions = []
  if (groups.includes("SUPER_ADMIN")) {
    permissions.push("convenio:add", "convenio:list:view");
  }
  if (groups.includes("MODERADOR")) {
    permissions.push("convenio:add", "convenio:list:view");
  }
  if (groups.includes("EQUIPO_LEGAL")) {
    permissions.push("convenio:add", "convenio:list:view");
  }
  return permissions.length > 0 ? [...new Set(permissions)] : undefined
}

exports.handler = async (event, context, callback) => {
  context && (context.callbackWaitsForEmptyEventLoop = false);
  console.log(`event: ${JSON.stringify(event, null, 2)}`);
  try {
    const permissions = getPermission(event.request.groupConfiguration.groupsToOverride);
    const claimsToAddOrOverride = {
      claimsToAddOrOverride: {
        permissions: permissions ? permissions.join(',') : undefined,
        groups: event.request.groupConfiguration.groupsToOverride
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
