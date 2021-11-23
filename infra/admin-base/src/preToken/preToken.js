
const getPermission = (groups) => {
  const permissions = []
  // resource:id:action
  if (groups.includes("SUPER_ADMIN")) {
    permissions.push("convenio::add", "convenio::view_all", "convenio::edit", "pregunta::edit", "categoria::add", "convenio::contacto_edit_all", "convenio::moderador_edit_all", "pregunta::view_all");
  }
  if (groups.includes("MODERADOR")) {
    permissions.push("convenio::view", "convenio::contacto_edit", "convenio::moderador_edit");
  }
  if (groups.includes("EQUIPO_LEGAL")) {
    permissions.push("convenio::view_all", "pregunta::edit", "pregunta::view_all");
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
        groups: event.request.groupConfiguration.groupsToOverride.join()
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
