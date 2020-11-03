const clock = "⏰";
console.time(clock);

const sqlite = require("better-sqlite3");

const db = new sqlite(`${__dirname}/db.sqlite`, {
    // verbose: console.log
});

try {
    // Get count
    const check = db.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name= ?;").get("testu"); // count will count LOL | Another type is by name
    console.log("check", check);

    if (!check["count(*)"]) { // Create table if does no exist
        const createtable = db.prepare(`
    CREATE TABLE testu (
        key text NOT NULL PRIMARY KEY,
        value text NOT NULL
    );`).run();
        console.log("create", createtable);

        const syncro = db.pragma("synchronous = 1"); // updates value simultaneously
        console.log("sync", syncro);

        const jour = db.pragma("journal_mode = WAL"); // used to revert if any corruption occures
        console.log("jour", jour);
    }

    const set = db.prepare("INSERT INTO testu (key, value) VALUES (?, ?)").run("user12345", "LOLXD");
    console.log("set", set);

    const sset = db.prepare("INSERT INTO testu (key, value) VALUES (?, ?)").run("user69420", "ROBLOX");
    console.log("sset", sset);

    const inplace = db.prepare("INSERT OR REPLACE INTO testu (key, value) VALUES (?, ?)").run("user12345", "OOF");
    console.log("inplace", inplace);

    const update = db.prepare("UPDATE testu SET value = ? WHERE key = ?").run("MINECRAFT", "user69420");
    console.log("update", update);

    const get = db.prepare("SELECT * FROM testu WHERE key = ?").get("user12345");
    console.log("get", get);

    const all = db.prepare("SELECT * FROM testu;").all();
    console.log("all", all);

    const del = db.prepare("DELETE FROM testu WHERE key = ?").run("user12345");
    console.log(del);

    const sall = db.prepare("SELECT * FROM testu;").all();
    console.log("sall", sall);

    dropper();
} catch (err) {
    console.error(err);
    dropper();
}

console.timeEnd(clock);

function dropper() {
    const drop = db.prepare("DROP TABLE testu").run();
    console.log("drop", drop);
}