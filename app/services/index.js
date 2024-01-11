async function pushDinosaurToDB(dinosaur) {
	try {
		await dinosaur.save();
		console.log("Successfully saved dinosaur to database");
	} catch (error) {
		console.error(error);
	}
}

module.exports = {
	pushDinosaurToDB: pushDinosaurToDB,
};
