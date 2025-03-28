const middleware = require('./middleware')
const controllers = require('./controllers')

module.exports = function (app) {

    // auth
    app.post('/api/auth/signup', [middleware.auth.checkEmailOrTel], controllers.auth.SignUp)
    app.post('/api/auth/signin', controllers.auth.SignIn)

    // user
    app.get('/api/user', [middleware.verify.verifyToken], controllers.user.GetOne)

    // produtcs
    app.post('/api/items', [], controllers.produtcs.All)
    app.post('/api/item', [], controllers.produtcs.One)
    app.post('/api/item/find', [], controllers.produtcs.Find)
    app.post('/api/item/create', [middleware.verify.verifyToken, middleware.role.IsSeller], controllers.produtcs.Create)
    app.put('/api/item/update', [middleware.verify.verifyToken, middleware.role.IsSeller], controllers.produtcs.Update)
    app.delete('/api/item/delete', [middleware.verify.verifyToken, middleware.role.IsSeller], controllers.produtcs.Destroy)
    app.put('/api/item/mark', [middleware.verify.verifyToken, middleware.role.IsSeller], controllers.produtcs.MarkProduct)
    app.get('/api/item/popular', [middleware.verify.verifyToken, middleware.role.IsSeller], controllers.produtcs.Popular)
    app.post('/api/item/store', [middleware.verify.verifyToken, middleware.role.IsSeller], controllers.produtcs.MyStore)

    // trolley
    app.post('/api/trolley/find', [middleware.verify.verifyToken], controllers.trolley.All)
    app.get('/api/trolley', [middleware.verify.verifyToken], controllers.trolley.List)
    app.post('/api/trolley/create', [middleware.verify.verifyToken], controllers.trolley.Create)
    app.put('/api/trolley/update', [middleware.verify.verifyToken], controllers.trolley.Update)
    app.delete('/api/trolley/delete', [middleware.verify.verifyToken], controllers.trolley.Destroy)

    // transaction
    app.post('/api/transaction', [middleware.verify.verifyToken], controllers.transaction.One)
    app.post('/api/transactions', [middleware.verify.verifyToken], controllers.transaction.List)
    app.post('/api/transactions/find', [middleware.verify.verifyToken], controllers.transaction.Find)
    app.post('/api/transaction/create', [middleware.verify.verifyToken], controllers.transaction.Create)
    app.delete('/api/transaction/delete', [middleware.verify.verifyToken], controllers.transaction.Destroy)

    // label
    app.post('/api/label/create', [middleware.verify.verifyToken, middleware.role.IsSeller], controllers.label.add)
    app.get('/api/labels', [middleware.verify.verifyToken], controllers.label.list)
    app.post('/api/label/store/create', [middleware.verify.verifyToken, middleware.role.IsAdmin], controllers.labelStore.Create)
    app.put('/api/label/store/update', [middleware.verify.verifyToken, middleware.role.IsAdmin], controllers.labelStore.Update)
    app.delete('/api/label/store/delete', [middleware.verify.verifyToken, middleware.role.IsAdmin], controllers.labelStore.Destroy)
    app.get('/api/label/delivery', [], controllers.delivery.Label.List)
    app.post('/api/label/delivery/create', [middleware.verify.verifyToken, middleware.role.IsAdmin], controllers.delivery.Label.Create)
    app.put('/api/label/delivery/update', [middleware.verify.verifyToken, middleware.role.IsAdmin], controllers.delivery.Label.Update)
    app.delete('/api/label/delivery/delete', [middleware.verify.verifyToken, middleware.role.IsAdmin], controllers.delivery.Label.Destroy)
    
    // store
    app.get('/api/seller', [middleware.verify.verifyToken, middleware.role.IsSeller], controllers.store.BySeller)
    app.post('/api/store/create', [middleware.verify.verifyToken, middleware.store.CheckDoubleStore], controllers.store.Add)
    app.put('/api/store/update', [middleware.verify.verifyToken, middleware.role.IsSeller], controllers.store.Update)
    app.get('/api/store/label', [middleware.verify.verifyToken], controllers.labelStore.MyStore.list)
    app.post('/api/store/label/add', [middleware.verify.verifyToken, middleware.role.IsSeller],controllers.labelStore.MyStore.add)
    app.put('/api/store/label/update', [middleware.verify.verifyToken, middleware.role.IsSeller], controllers.labelStore.MyStore.update)
    app.get('/api/store/balance', [middleware.verify.verifyToken, middleware.role.IsSeller], controllers.store.Balance)
    app.get('/api/store/introlley', [middleware.verify.verifyToken, middleware.role.IsSeller], controllers.store.InTrolley)
    app.post('/api/store/order', [middleware.verify.verifyToken, middleware.role.IsSeller], controllers.store.Order)
    app.get('/api/store/operation', [middleware.verify.verifyToken, middleware.role.IsSeller], controllers.store.Operation)
    app.post('/api/store/order/handle', [middleware.verify.verifyToken, middleware.role.IsSeller], controllers.store.HandleOrderStatus)

    // delivery
    app.get('/api/delivery', [middleware.verify.verifyToken], controllers.delivery.List)
    app.post('/api/delivey/create', [middleware.verify.verifyToken, middleware.role.IsAdmin], controllers.delivery.Create),
    app.delete('/api/delivery/delete', [middleware.verify.verifyToken, middleware.role.IsAdmin], controllers.delivery.Destroy)

    //address
    app.get('/api/user/addresses', [middleware.verify.verifyToken], controllers.address.All)
    app.post('/api/user/address', [middleware.verify.verifyToken], controllers.address.One)
    app.post('/api/user/address/find', [middleware.verify.verifyToken], controllers.address.Find)
    app.post('/api/user/address/create', [middleware.verify.verifyToken], controllers.address.Create)
    app.put('/api/user/address/update', [middleware.verify.verifyToken], controllers.address.Update)
    app.delete('/api/user/address/delete', [middleware.verify.verifyToken], controllers.address.Destroy)
    app.get('/api/store/address', [middleware.verify.verifyToken, middleware.role.IsSeller], controllers.address.Shop.Get)
    app.post('/api/store/address/edit', [middleware.verify.verifyToken, middleware.role.IsSeller], controllers.address.Shop.CreateOrUpdate)

    // for example
    app.post('/api/auth/hasToken', controllers.auth.SignIn)
    app.get('/api/test', async function (req, res) {
        res.json({
            status: 'success'
        })
    })
}