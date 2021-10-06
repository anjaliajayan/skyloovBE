module.exports = (sequelize, type) => {

    let Register = sequelize.define("register", {
        regID: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        firstName: type.STRING,
        lastName: type.INTEGER,
        userName: type.STRING,
        password:type.STRING,
        email:type.STRING,
        contact:type.STRING,
        gender:type.STRING,
        role:type.STRING,
        token:type.STRING
    }, {
        freezeTableName: true,
        timestamps: false,
        underscored: false,
    });
    return Register;
}
