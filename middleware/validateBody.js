function validateBody() {
    return (req, res, next) => {
        if (!req.body.vin) {
            return res.status(400).json({
                errorMessage: "Please add VIN number and try your request again."
            })
        } else if (!req.body.make) {
            return res.status(400).json({
                errorMessage: "Please add make of vehicle and try your request again."
            })
        } else if (!req.body.model) {
            return res.status(400).json({
                errorMessage: "Please add model of vehicle and try your request again."
            })
        } else if (!req.body.mileage) {
            return res.status(400).json({
                errorMessage: "Please add mileage of vehicle and try your request again."
            })
        } else {
            next()
        }
    }
}

module.exports = validateBody();
