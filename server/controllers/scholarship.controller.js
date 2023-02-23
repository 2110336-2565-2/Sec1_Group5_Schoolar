const Scholarship = require('../models/scholarship')

/*
 * @desc     Get all scholarships
 * @route    GET scholarship/
 * @access   Private
 */
exports.getAllScholarships = async (req, res) => {
	// #swagger.tags = ['scholarship']
	try {
		const scholarships = await Scholarship.find()
		return res.status(200).json({
			success: true,
			count: scholarships.length,
			data: scholarships,
		})
	} catch (error) {
		return res.status(500).json({
			success: false,
			error: 'Server Error',
		})
	}
}

/*
 * @desc     Get single scholarship
 * @route    GET scholarship/:id
 * @access   Private
 */
exports.getScholarship = async (req, res) => {
	// #swagger.tags = ['scholarship']
	try{
        const scholarship = await Scholarship.findById(req.params.id);
        if(!scholarship) return res.status(200).json({success: false});
        res.status(200).json({success:true, data:scholarship});
    }catch(err){
        res.status(400).json({success:false});
    }
}
