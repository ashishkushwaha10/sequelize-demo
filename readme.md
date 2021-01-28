# ORM definition:

# Referenced from Stack overflow.
 - Object-Relational Mapping (ORM) is a technique that lets you query and manipulate data from a database using an object-oriented paradigm. When talking about ORM, most people are referring to a library that implements the Object-Relational Mapping technique, hence the phrase "an ORM".

 - An ORM library is a completely ordinary library written in your language of choice that encapsulates the code needed to manipulate the data, so you don't use SQL anymore; you interact directly with an object in the same language you're using.

# ODM definition:

# Referenced from medium article.
 - ODM on the other hand is an Object Document Mapper, which maps objects with a Document Database like MongoDB.
 - The main difference is that ORM is for relational databases, while ODM does the mapping for document representation of data.


# Sequelize:
 - Sequelize is a promise-based Node.js ORM for Postgres, MySQL, MariaDB, SQLite and Microsoft SQL Server.
 - It features solid transaction support, relations, eager and lazy loading, read replication and more.


# Basics

 - # Datatypes.

 - # Pluralization (model names).

- # New databases versus existing databases.

- # Promises and async/await support.
 - Most of the methods provided by Sequelize are asynchronous and therefore return Promises. They are all Promises , so you can use the Promise API (for example, using then,  catch, finally) out of the box.
 - Of course, using async and await works normally as well.

- # data sanitition.

- # Model definitions.

- # data validation.

- # Model Synchronization.(no options, force: true, alter: true)

- # Timestamps.

- # Querying.
 - findAll, findByPk, findOne, findOrCreate, findAndCountAll(for pagination), count, min, max, sum
 - attributes.
 - where clause.
 - bulkCreate.

- # sequelize Operators (like, in, between, lt, gt, eq, not, regex, or, and, )

- # virtual fields.

- # Raw queries.

- # hooks.
 - const hookTypes = {
  beforeValidate: { params: 2 },
  afterValidate: { params: 2 },
  validationFailed: { params: 3 },
  beforeCreate: { params: 2 },
  afterCreate: { params: 2 },
  beforeDestroy: { params: 2 },
  afterDestroy: { params: 2 },
  beforeRestore: { params: 2 },
  afterRestore: { params: 2 },
  beforeUpdate: { params: 2 },
  afterUpdate: { params: 2 },
  beforeSave: { params: 2, proxies: ['beforeUpdate', 'beforeCreate'] },
  afterSave: { params: 2, proxies: ['afterUpdate', 'afterCreate'] },
  beforeUpsert: { params: 2 },
  afterUpsert: { params: 2 },
  beforeBulkCreate: { params: 2 },
  afterBulkCreate: { params: 2 },
  beforeBulkDestroy: { params: 1 },
  afterBulkDestroy: { params: 1 },
  beforeBulkRestore: { params: 1 },
  afterBulkRestore: { params: 1 },
  beforeBulkUpdate: { params: 1 },
  afterBulkUpdate: { params: 1 },
  beforeFind: { params: 1 },
  beforeFindAfterExpandIncludeAll: { params: 1 },
  beforeFindAfterOptions: { params: 1 },
  afterFind: { params: 2 },
  beforeCount: { params: 1 },
  beforeDefine: { params: 2, sync: true, noModel: true },
  afterDefine: { params: 1, sync: true, noModel: true },
  beforeInit: { params: 2, sync: true, noModel: true },
  afterInit: { params: 1, sync: true, noModel: true },
  beforeAssociate: { params: 2, sync: true },
  afterAssociate: { params: 2, sync: true },
  beforeConnect: { params: 1, noModel: true },
  afterConnect: { params: 2, noModel: true },
  beforeDisconnect: { params: 1, noModel: true },
  afterDisconnect: { params: 1, noModel: true },
  beforeSync: { params: 1 },
  afterSync: { params: 1 },
  beforeBulkSync: { params: 1 },
  afterBulkSync: { params: 1 },
  beforeQuery: { params: 2 },
  afterQuery: { params: 2 }
};

- # support for indexes.

- # constraints and circularities.

- # Data association.
 - hasOne. (one-to-one)(1:1)
 - hasMany.(one-to-many) (1:N)
 - belongsTo.(one-to-one)(1:1) (one-to-many)(1:N)
 - belongsToMany. (many-to-many)(M:N)

- # Paranoid(soft deletion)

- # Eager loading vs lazy loading.

- # Transaction support.

- # Sub queries.
 - So how can we achieve that with more help from Sequelize, without having to write the whole raw query by hand?
 - The answer: by combining the attributes option of the finder methods (such as findAll) with the sequelize.literal utility function, that allows you to directly insert arbitrary content into the query without any automatic escaping.

 - This means that Sequelize will help you with the main, larger query, but you will still have to write that sub-query by yourself:

Post.findAll({
    attributes: {
        include: [
            [
                // Note the wrapping parentheses in the call below!
                sequelize.literal(`(
                    SELECT COUNT(*)
                    FROM reactions AS reaction
                    WHERE
                        reaction.postId = post.id
                        AND
                        reaction.type = "Laugh"
                )`),
                'laughReactionsCount'
            ]
        ]
    }
});

- # Typescript support.
 - As Sequelize heavily relies on runtime property assignments, TypeScript won't be very useful out of the box. A decent amount of manual type declarations are needed to make  models workable.


- # Read Replication:
 - Sequelize supports read replication, i.e. having multiple servers that you can connect to when you want to do a SELECT query. When you do read replication, you specify one or more servers to act as read replicas, and one server to act as the write master, which handles all writes and updates and propagates them to the replicas (note that the actual replication process is not handled by Sequelize, but should be set up by database backend).

 - Sequelize uses a pool to manage connections to your replicas. Internally Sequelize will maintain two pools created using pool configuration.

 - If you want to modify these, you can pass pool as an options when instantiating Sequelize.

 - Each write or useMaster: true query will use write pool. For SELECT read pool will be used. Read replica are switched using a basic round robin scheduling.

- # 



- # Migrations (through Sequelize CLI).



















































































# Swagger API
 - Why we should use Swagger API.
 - YAML and JSON support.
 - Swagger UI and Edito.
 - Swagger express UI.
 - Injecting swagger docs into our app.


# Authentication and Authorization.
 - JWT
 - refresh tokens and access tokens.
