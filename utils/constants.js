/* Expresiones regulares */
export const  EXP_REG_MINUSCULAS = /[a-z]/;
export const  EXP_REG_MAYUSCULAS = /[A-Z]/;
export const  EXP_REG_NUMEROS = /[0-9]/

/* Mensajes error */
export const ERROR_NOMBRE_OBLIGATORIO = "El nombre es obligatorio";
export const ERROR_EMAIL_FORMATO_INCORRECTO = "El formato de email no es válido";
export const ERROR_USUARIO_YA_EXISTE = "El usuario introducido ya existe";
export const ERROR_USUARIO_NO_EXISTE = "El usuario introducido no existe";
export const ERROR_PASSWORD_DEMASIADO_CORTO = "El password debe tener al menos 6 caracteres";
export const ERROR_PASSWORD_FORMATO_INCORRECTO = "El password debe contener al menos 1 letra minúscula, 1 mayúscula y 1 número";
export const ERROR_ROLE_OBLIGATORIO = "El tipo de usuario es obligatorio";
export const ERROR_SERVER = "Servicio no disponible, intentelo de nuevo más tarde";
export const ERROR_PASSWORD_INCORRECTO = "La contraseña introducida no es correcta";
export const ERROR_NOMBRE_RECURSO_OBLIGATORIO = "El nombre del recurso es obligatorio";
export const ERROR_FORMATO_RECURSO_OBLIGATORIO = "El formato de recurso es obligatorio";
export const ERROR_TIPO_RECURSO_OBLIGATORIO = "El tipo de recurso es obligatorio";
export const ERROR_RECURSO_NOT_FOUND = "El recurso no existe";
export const ERROR_RECURSO_INACCESIBLE = "No puedes acceder a este recurso";
export const ERROR_PARAM_ID_INCORRECTO = "Formato de id incorrecto";
export const ERROR_PACIENTE_NOT_FOUND = "El paciente no existe";
export const ERROR_ARCHIVO_NO_RECIBIDO = "No se ha recibido ningún archivo";
export const ERROR_TERAPIA_NOT_FOUND = "La terapia no existe";

/* Mensajes de respuesta */
export const RESPONSE_USUARIO_GUARDADO_OK = "El usuario se ha guardado correctamente";
export const RESPONSE_USUARIO_GUARDADO_KO = "Ha ocurrido un error al guardar el usuario";
export const RESPONSE_LOGIN_OK = "Se ha iniciado sesión correctamente";
export const RESPONSE_RECURSO_CREADO_OK = "El recurso se ha creado correctamente";
export const RESPONSE_RECURSO_ELIMINADO_OK = "El recurso se ha eliminado con éxito";
export const RESPONSE_RECURSO_ACTUALIZADO_OK = "El recurso se ha actualizado correctamente";
export const RESPONSE_PACIENTE_CREADO_OK = "El paciente se ha creado correctamente";
export const RESPONSE_PACIENTE_ACTUALIZADO_OK = "El paciente se ha actualizado correctamente";
export const RESPONSE_PACIENTE_ELIMINADO_OK = "El paciente se ha eliminado correctamente";
export const RESPONSE_TERAPIA_CREADA_OK = "La terapia se ha creado correctamente";
export const RESPONSE_TERAPIA_ACTUALIZADA_OK = "La terapia se ha actualizado correctamente";
export const RESPONSE_TERAPIA_ELIMINADA_OK = "La terapia se ha eliminado correctamente";


