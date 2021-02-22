module.exports = function () {
    return {
        flywayArgs: {
            url: `jdbc:postgresql://localhost/library_borrowal`,
            schemas: 'public',
            locations: 'filesystem:resources/db_migrations',
            user: `postgres`,
            password: 'root',
            sqlMigrationSuffixes: '.sql',
            baselineOnMigrate: false,
        },
        version: '7.5.3', // optional, empty or missing will download the latest
        downloads: {
            expirationTimeInMs: -1, // optional, -1 will never check for updates, defaults to 1 day.
        }
    };
};