import React, { useContext } from "react";
import { AdminContext } from "../../context/AdminContext/AdminState";

const UsersTab = () => {
    const { users, deleteUser } = useContext(AdminContext);

    const handleDeleteUser = (user) => {
        if (window.confirm(`¿Seguro que quieres eliminar al usuario "${user.userName}"?`)) {
        deleteUser(user.id);
        }
    };

    return (
        <section className="admin-panel__section">
        <h2 className="admin-panel__section-title">Usuarios</h2>
        <table className="admin-panel__table">
            <thead>
            <tr className="admin-panel__table-row">
                <th className="admin-panel__table-head">Nombre</th>
                <th className="admin-panel__table-head">Email</th>
                <th className="admin-panel__table-head">Rol</th>
                <th className="admin-panel__table-head">Acciones</th>
            </tr>
            </thead>
            <tbody>
            {users.map((user) => (
                <tr key={user.id} className="admin-panel__table-row">
                <td className="admin-panel__table-data">{user.userName}</td>
                <td className="admin-panel__table-data">{user.email}</td>
                <td className="admin-panel__table-data">{user.role}</td>
                <td className="admin-panel__table-data">
                    <button
                    className="admin-panel__btn admin-panel__btn--delete"
                    onClick={() => handleDeleteUser(user)}
                    >
                    Borrar
                    </button>
                </td>
                </tr>
            ))}
            </tbody>
        </table>
        </section>
    );
};

export default UsersTab;
