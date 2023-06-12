export const deleteTurnsAction = (identificationNumber) => {
    return async (dispatch) => {
      try {
        // Aquí realizarías la lógica para eliminar el turno utilizando tu servicio/API
        // Por ejemplo, puedes usar el método `useDeleteTurnsMutation` que ya estás utilizando en el componente
  
        // Llamada al servicio/API para eliminar el turno
        const response = await useDeleteTurnsMutation(identificationNumber);
  
        // Verificar si la eliminación fue exitosa
        if (response.status === 'success') {
          // Si la eliminación fue exitosa, despachamos la acción de eliminación con el identificationNumber
          dispatch({ type: 'DELETE_TURN', payload: identificationNumber });
        } else {
          // Si la eliminación falló, puedes despachar una acción de error o mostrar un mensaje de error
          dispatch({ type: 'DELETE_TURN_ERROR', payload: response.error });
        }
      } catch (error) {
        // Si ocurre un error en la petición o en la lógica de eliminación, puedes despachar una acción de error o mostrar un mensaje de error
        dispatch({ type: 'DELETE_TURN_ERROR', payload: error.message });
      }
    };
  };