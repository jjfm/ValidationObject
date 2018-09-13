/*This function will validate any form made by FMS only
  FormNumber : The object used to show the multiple errors messages
  validateStep : Valid a specific step when a user press next or press one of the arrow button. This function will return true if the step is valid.
  buildErrorMessage : Build the error message inside FormNumber object then display them inside a details tag and then display the tag inside the error Panel
  InitArrayError : Init the FormNumber object to have the following propreties : StepNumber, stepName, section, error
  Init Mask : Init the mask for any input that need special attention like a phone number textbox
  This object is really tighly couple. There is probably a way to make it more costumizable :)
*/
//TODO Add Language option when defining the object
//Finish the lang table
let ValidationObject = {
    "FormNumber": {},
    isText: function (textbox) {
        if ($(textbox).is(".money") || $(textbox).is(".pourcent") || $(textbox).is(".time") || $(textbox).is(".date")) {
            return false;
        }
        else {
            return true;
        }
    },
    validateStep: function (step, formID) {
        //Init
        let errorMessage = {
            "SectionNumber": {

            }
        }
        var numberOfError = 0;
        var isInvisible = false;
        let div = $("#step" + step);
        let sections = div.find(".section");
        if (!$(div).is(":visible")) {
            $(div).show();
            isInvisible = true;
        }
        for (let i = 0; i < sections.length; i++) {
            //DOM Elements
            errorMessage["SectionNumber"][sections[i].id] = { "Error": [] };
            var fields = $(sections[i]).find("fieldset");
            var texts = $(sections[i]).find("input[type=text]");
            var textsArea = $(sections[i]).find("textarea");
            var numbers = $(sections[i]).find("input[type=number]")
            var email = $(sections[i]).find("input[type=email]");
            var date = $(sections[i]).find("input[type=date]");
            var time = $(sections[i]).find("input[type=time]");
            var selects = $(sections[i]).find("select");
            var fileUploaders = $(sections[i]).find("input:file");
            //fieldset for radios and checkboxes
            if (fields.length > 0) {
                $(fields).each(function () {
                    /*In order to validate radio button and checkbox : 
                    1-one of the input group need to have the attribute required (Generally the first one)
                    2-The name of each input group need to be the same
                    3-If the input group are inside a fieldset, the .element() function need to have the following parameters : #idFieldSet input[type=radio|checkbox]
                    */
                    var checkboxs = $(this).find("input[type=checkbox]");
                    var radios = $(this).find("input[type=radio]");
                    if (radios.length > 0 && radios[0].hasAttribute("required")) {
                        var validator = $("#" + formID).validate({
                            debug: true,
                            rules: {
                                ["radioButtonGroup" + this.id]: "required"
                            }
                        }).element("#" + this.id + " input[type=radio]");
                        if (!validator) {
                            numberOfError += 1;
                            errorMessage["SectionNumber"][sections[i].id]["Error"].push("<p><a href=\"#" + this.id + "\">Error " + numberOfError + " : This field is required</p>");
                        }
                    }
                    if (checkboxs.length > 0 && checkboxs[0].hasAttribute("required")) {
                        var validator = $("#" + formID).validate({
                            debug: true,
                            rules: {
                                ["checkboxGroup" + this.id]: "required"
                            }
                        }).element("#" + this.id + " input[type=checkbox]");
                        if (!validator) {
                            numberOfError += 1;
                            errorMessage["SectionNumber"][sections[i].id]["Error"].push("<p><a href=\"#" + this.id + "\">Error " + numberOfError + " : This field is required</p>");
                        }
                    }

                });
            }
            //Input type text 
            if (texts.length > 0) {
                $(texts).each(function () {
                    if (this.hasAttribute("required")) {
                        var textName = this.id;
                        if (ValidationObject.isText(this)) {
                            var validator = $("#" + formID).validate({
                                debug: true,
                                rules: {
                                    textName: { required: true }
                                }

                            }).element("#" + textName);
                            if (!validator) {
                                numberOfError += 1;
                                errorMessage["SectionNumber"][sections[i].id]["Error"].push("<p id=\"p" + textName + "\"><a href=\"#" + textName + "\">Error " + numberOfError + " : This field is required</p>");
                            }
                        } else {
                            if ($(this).is('.money')) {
                                var validator = $("#" + formID).validate({
                                    debug: true,
                                    rules: {
                                        textName: {
                                            required: true,
                                            money: true
                                        }
                                    }
                                }).element("#" + textName);
                                if (!validator) {
                                    numberOfError += 1;
                                    errorMessage["SectionNumber"][sections[i].id]["Error"].push("<p id=\"p" + textName + "\" data-stepid=\"" + step + "\"><a href=\"#" + textName + "\">Error " + numberOfError + " : This field is required and/or the monetary value is not valid.</p>");
                                }
                            }
                            else if ($(this).is(".pourcent")) {
                                var validator = $("#" + formID).validate({
                                    debug: true,
                                    rules: {
                                        textName: {
                                            required: true,
                                            pourcent: true
                                        }
                                    }
                                }).element("#" + textName);
                                if (!validator) {
                                    numberOfError += 1;
                                    errorMessage["SectionNumber"][sections[i].id]["Error"].push("<p id=\"p" + textName + "\" data-stepid=\"" + step + "\"><a href=\"#" + textName + "\">Error " + numberOfError + " : This field is required and/or the percentage value is not valid.</p>");
                                }
                            }
                            else if ($(this).is(".time")) {
                                var validator = $("#" + formID).validate({
                                    debug: true,
                                    rules: {
                                        textName: {
                                            required: true,
                                            time: true
                                        }
                                    }

                                }).element("#" + textName);
                                if (!validator) {
                                    numberOfError += 1;
                                    errorMessage["SectionNumber"][sections[i].id]["Error"].push("<p id=\"p" + textName + "\" data-stepid=\"" + step + "\"><a href=\"#" + textName + "\">Error " + numberOfError + " : This field is required and/or the time value is not valid.</p>");
                                }
                            }
                            else if ($(this).is(".date")) {
                                var validator = $("#" + formID).validate({
                                    debug: true,
                                    rules: {
                                        textName: {
                                            required: true,
                                            date: true
                                        }
                                    }
                                }).element("#" + textName);
                                if (!validator) {
                                    numberOfError += 1;
                                    errorMessage["SectionNumber"][sections[i].id]["Error"].push("<p id=\"p" + textName + "\" data-stepid=\"" + step + "\"><a href=\"#" + textName + "\">Error " + numberOfError + " : This field is required and/or the date is not valid. The date must correspond to the format yyyy-mm-dd</p>");
                                }
                            }
                        }
                    } else {
                        if (ValidationObject.isText(this)) {
                            var textName = this.id;
                            var validator = $("#" + formID).validate({
                                debug: true,
                                rules: {
                                    textName: { required: true }
                                }

                            }).element("#" + textName);
                            if (!validator) {
                                numberOfError += 1;
                                errorMessage["SectionNumber"][sections[i].id]["Error"].push("<p id=\"p" + textName + "\"><a href=\"#" + textName + "\">Error " + numberOfError + " : This field is required</p>");
                            }
                            else {
                                var textName = this.id;
                                if ($(this).is('.money')) {
                                    var validator = $("#" + formID).validate({
                                        debug: true,
                                        rules: {
                                            textName: {
                                                required: true,
                                                money: true
                                            }
                                        }
                                    }).element("#" + textName);
                                    if (!validator) {
                                        numberOfError += 1;
                                        errorMessage["SectionNumber"][sections[i].id]["Error"].push("<p id=\"p" + textName + "\" data-stepid=\"" + step + "\"><a href=\"#" + textName + "\">Error " + numberOfError + " : This field is required and/or the monetary value is not valid.</p>");
                                    }
                                }
                                else if ($(this).is(".pourcent")) {
                                    var validator = $("#" + formID).validate({
                                        debug: true,
                                        rules: {
                                            textName: {
                                                required: true,
                                                pourcent: true
                                            }
                                        }
                                    }).element("#" + textName);
                                    if (!validator) {
                                        numberOfError += 1;
                                        errorMessage["SectionNumber"][sections[i].id]["Error"].push("<p id=\"p" + textName + "\" data-stepid=\"" + step + "\"><a href=\"#" + textName + "\">Error " + numberOfError + " : This field is required and/or the percentage value is not valid.</p>");
                                    }
                                }
                                else if ($(this).is(".time")) {
                                    var validator = $("#" + formID).validate({
                                        debug: true,
                                        rules: {
                                            textName: {
                                                required: true,
                                                time: true
                                            }
                                        }

                                    }).element("#" + textName);
                                    if (!validator) {
                                        numberOfError += 1;
                                        errorMessage["SectionNumber"][sections[i].id]["Error"].push("<p id=\"p" + textName + "\" data-stepid=\"" + step + "\"><a href=\"#" + textName + "\">Error " + numberOfError + " : This field is required and/or the time value is not valid.</p>");
                                    }
                                }
                                else if ($(this).is(".date")) {
                                    var validator = $("#" + formID).validate({
                                        debug: true,
                                        rules: {
                                            textName: {
                                                date: true
                                            }
                                        }
                                    }).element("#" + textName);
                                    if (!validator) {
                                        numberOfError += 1;
                                        errorMessage["SectionNumber"][sections[i].id]["Error"].push("<p id=\"p" + textName + "\" data-stepid=\"" + step + "\"><a href=\"#" + textName + "\">Error " + numberOfError + " : The date must correspond to the format yyyy-mm-dd</p>");
                                    }
                                }
                            }
                        }
                    }
                });
            }
            //Input type email
            if (email.length > 0) {
                $(email).each(function () {
                    if (this.hasAttribute("required")) {
                        var textName = this.id;
                        var validator = $("#" + formID).validate({
                            debug: true,
                            rules: {
                                textName: {
                                    required: true,
                                    email: true
                                }
                            }
                        }).element("#" + textName);
                        if (!validator) {
                            numberOfError += 1;
                            errorMessage["SectionNumber"][sections[i].id]["Error"].push("<p id=\"p" + textName + "\" data-stepid=\"" + step + "\"><a href=\"#" + textName + "\">Error " + numberOfError + " : This field is required and/or the email address is not valid</a></p>");
                        }
                    }
                    else {
                        var textName = this.id;
                        var validator = $("#" + formID).validate({
                            debug: true,
                            rules: {
                                textName: {
                                    email: true
                                }
                            }

                        }).element("#" + textName);
                        if (!validator) {
                            numberOfError += 1;
                            errorMessage["SectionNumber"][sections[i].id]["Error"].push("<p id=\"p" + textName + "\" data-stepid=\"" + step + "\"><a href=\"#" + textName + "\">Error " + numberOfError + " : Please specify a valid email address</a></p>");
                        }
                    }
                });
            }
            //Input type date
            if (date.length > 0) {
                $(date).each(function () {
                    if (this.hasAttribute("required")) {
                        var textName = this.id;
                        var validator = $("#" + formID).validate({
                            debug: true,
                            rules: {
                                textName: {
                                    required: true,
                                    date: true
                                }
                            }
                        }).element("#" + textName);
                        if (!validator) {
                            numberOfError += 1;
                            errorMessage["SectionNumber"][sections[i].id]["Error"].push("<p id=\"p" + textName + "\" data-stepid=\"" + step + "\"><a href=\"#" + textName + "\">Error " + numberOfError + " : This field is required and/or the date is not valid. The date must correspond to the format yyyy-mm-dd.</a></p>");
                        }
                    } else {
                        var textName = this.id;
                        var validator = $("#" + formID).validate({
                            debug: true,
                            rules: {
                                textName: {
                                    date: true
                                }
                            }
                        }).element("#" + textName);
                        if (!validator) {
                            numberOfError += 1;
                            errorMessage["SectionNumber"][sections[i].id]["Error"].push("<p id=\"p" + textName + "\" data-stepid=\"" + step + "\"><a href=\"#" + textName + "\">Error " + numberOfError + " : Please specify a valid date. The date must correspond to the format yyyy-mm-dd. </a></p>");
                        }
                    }

                });
            }
            //Input type number
            if (numbers.length > 0) {
                $(numbers).each(function () {
                    if (this.hasAttribute("required")) {
                        var textName = this.id;
                        var validator = $("#" + formID).validate({
                            debug: true,
                            rules: {
                                textName: {
                                    number: true
                                }
                            }
                        }).element("#" + textName);
                        if (!validator) {
                            numberOfError += 1;
                            errorMessage["SectionNumber"][sections[i].id]["Error"].push("<p id=\"p" + textName + "\" data-stepid=\"" + step + "\"><a href=\"#" + textName + "\">Error " + numberOfError + " : This field is required and/or the value is not a valid integer.</a></p>");
                        }
                    } else {
                        var textName = this.id
                        var validator = $("#" + formdID).validate({
                            debug: true,
                            rules: {
                                textName: {
                                    number: true
                                }
                            }
                        }).element("#" + textName);
                    }
                });
            }
            //Selects tag
            if (selects.length > 0) {
                $(selects).each(function () {
                    if (this.hasAttribute("required")) {
                        var selectName = this.id;
                        var validator = $("#" + formID).validate({
                            debug: true,
                            rules: {
                                selectName: {
                                    required: true
                                }
                            }
                        }).element("#" + selectName);
                        if (!validator) {
                            numberOfError += 1;
                            errorMessage["SectionNumber"][sections[i].id]["Error"].push("<p id=\"p" + selectName + "\" data-stepid=\"" + step + "\"><a href=\"#" + selectName + "\">Error " + numberOfError + " : This field is required</a></p>");
                        }
                    }
                });
            }
            //textarea tag
            if (textsArea.length > 0) {
                $(textsArea).each(function () {
                    if (this.hasAttribute("required")) {
                        if (!$(this).hasClass("limited")) {
                            var validator = $("#" + formID).validate({
                                debug: true,
                                rules: {
                                    [this.id]: {
                                        required: true
                                    }
                                }
                            }).element("#" + this.id);
                            if (!validator) {
                                numberOfError += 1;
                                errorMessage["SectionNumber"][sections[i].id]["Error"].push("<p id=\"p" + textName + "\" data-stepid=\"" + step + "\"><a href=\"#" + this.id + "\">Error " + numberOfError + " : This field is required</a></p>");
                            }
                        }
                        else {
                            var validator = $("#" + formID).validate({
                                debug: true,
                                rules: {
                                    [this.id]: {
                                        required: true,
                                        maxlength: 500
                                    }
                                }
                            }).element("#" + this.id);
                            if ($(this).val().length > 500) {
                                validator = false;
                                if ($("#" + this.id + "-error").length === 0) {
                                    $('<span id="' + this.id + '-error" class="label label-danger"/>').text("This field must not exceed 500 caracters").insertBefore(this);
                                }
                            }
                            if (!validator) {
                                numberOfError += 1;
                                errorMessage["SectionNumber"][sections[i].id]["Error"].push("<p id=\"p" + textName + "\" data-stepid=\"" + step + "\"><a href=\"#" + this.id + "\">Error " + numberOfError + " : This field is required and must not excedd 500 caracters</a></p>");
                                $(this).keyup(function () {
                                    if ($(this).val().length <= 500) {
                                        $("#" + this.id + "-error").remove();
                                    } else {
                                        if ($("#" + this.id + "-error").length === 0) {
                                            $('<span id="' + this.id + '-error" class="label label-danger"/>').text("This field must not exceed 500 caracters").insertBefore(this);
                                        }
                                    }
                                });
                            }
                        }
                    } else {
                        if ($(this).hasClass("limited") && $(this).val().length > 500) {
                            var validator = false;
                            var textName = this.id;
                            if ($("#" + this.id + "-error").length === 0) {
                                $('<span id="' + this.id + '-error" class="label label-danger"/>').text("This field must not exceed 500 caracters").insertBefore(this);
                            }
                            if (!validator) {
                                numberOfError += 1;
                                errorMessage["SectionNumber"][sections[i].id]["Error"].push("<p id=\"p" + textName + "\" data-stepid=\"" + step + "\"><a href=\"#" + this.id + "\">Error " + numberOfError + " : This field is required and must not excedd 500 caracters</a></p>");
                                $(this).keyup(function () {
                                    if ($(this).val().length <= 500) {
                                        $("#" + this.id + "-error").remove();
                                    } else {
                                        if ($("#" + this.id + "-error").length === 0) {
                                            $('<span id="' + this.id + '-error" class="label label-danger"/>').text("This field must not exceed 500 caracters").insertBefore(this);
                                        }
                                    }
                                });
                            }
                        }
                    }
                });
            }

        }
        if (numberOfError > 0) {
            ValidationObject.buildErrorMessage(formID, step, errorMessage);
            $(divPanelError).show(500);
            if (isInvisible) {
                $(div).hide();
                isInvisible = false;
            }
            return false;
        } else {
            $("#dt" + step).hide();
            $("#dv" + step).empty();
            isVisible = false;
            var dt = $(".dt")
            var count = 0;
            for (let i = 0; i < dt.length; i++) {
                if ($("#" + dt[i].id).attr("style") === "display: none;") {
                    count++;
                }
            }
            if (count === $(".step").length) {
                $("#divPanelError").hide(500);
            }
        }
        return true;
    },
    validateUploader: function () {
        return true;
    },
    buildErrorMessage: function (formID, step, errorMessage) {
        var sections = $("#step" + step).find(".section");
        var stepName = "step" + step;
        for (let i = 0; i < sections.length; i++) {
            ValidationObject["FormNumber"][formID]["StepNumber"][stepName][sections[i].id]["Error"] = [];
            for (let j = 0; j < errorMessage["SectionNumber"][sections[i].id]["Error"].length; j++) {
                ValidationObject["FormNumber"][formID]["StepNumber"][stepName][sections[i].id]["Error"].push(errorMessage["SectionNumber"][sections[i].id]["Error"][j]);
            }
        }
        let divPanelErrorBody = $("#errorBody");
        for (let i = 1; i < Object.keys(ValidationObject["FormNumber"][formID]["StepNumber"]).length + 1; i++) {
            if ($("#dt" + i).length === 0) {
                var details = $("<details id=\"dt" + i + "\" class=\"dt\"><summary>Step " + i + "</summary><div id=\"dv" + i + "\"></div></details>");
                details.appendTo(divPanelErrorBody);
            }
        }
        console.log(ValidationObject["FormNumber"])
        $("#dv" + step).empty();
        for (let i = 0; i < sections.length; i++) {
            for (let j = 0; j < ValidationObject["FormNumber"][formID]["StepNumber"][stepName][sections[i].id]["Error"].length; j++) {
                $("#dv" + step).append(ValidationObject["FormNumber"][formID]["StepNumber"][stepName][sections[i].id]["Error"][j]);
            }
        }
        for (let i = 1; i < Object.keys(ValidationObject["FormNumber"][formID]["StepNumber"]).length + 1; i++) {
            if ($("#dv" + i).is(":empty")) {
                $("#dt" + i).hide();
            }
            else {
                $("#dt" + i).show();
            }
        }
    },
    InitArrayError: function (formID) {
        ValidationObject["FormNumber"][formID] = {};
        ValidationObject["FormNumber"][formID]["StepNumber"] = {};
        var steps = $("#" + formID).find(".step");
        for (let i = 0; i < steps.length; i++) {
            ValidationObject["FormNumber"][formID]["StepNumber"][steps[i].id] = {};
            var sections = $(steps[i]).find(".section");
            for (let j = 0; j < sections.length; j++) {
                ValidationObject["FormNumber"][formID]["StepNumber"][steps[i].id][sections[j].id] = { "Error": [] };
            }
        }
    },
    InitMask: function (step) {
        /*Init the mask for various input
        You can find more info here : https://igorescobar.github.io/jQuery-Mask-Plugin/ */
        var div = $("#step" + step);
        var texts = div.find("input:text");
        for (let i = 0; i < texts.length; i++) {
            if ($(texts[i]).is(".telephone")) {
                $(texts[i]).mask('(000) 000-0000', { placeholder: "(___) ___-____" });
            }
            if ($(texts[i]).is(".postal")) {
                $(texts[i]).mask("A0A 0A0", { translation: { A: { pattern: /[A-Za-z]/ } }, placeholder: "A1A 1A1" });
            }
            if ($(texts[i]).is(".time")) {
                $(texts[i]).mask("00:00:00", { placeholder: "__:__:__" })
            }
            if ($(texts[i]).is(".pourcent")) {
                $(texts[i]).mask("000");
            }
        }
    },
    InitValidationDefault: function () {
        $.validator.setDefaults({
            errorPlacement: function (error, element) {
                if (element.parent().is(".input-group-date") || element.is(".money") || element.is(".pourcent") || element.is(".time")) {
                    error.insertBefore(element.parent());
                    error.addClass("label label-danger");
                    element.addClass("mrgn-tp-1");
                    $(".input-group-addon").parent().addClass("mrgn-tp-sm");
                } else {
                    if (element.parent().parent().parent().children(":first-child").is("legend")) {
                        error.insertAfter(element.parent().parent().parent().children(":first-child"));
                    }
                    else {
                        error.insertBefore(element);
                    }
                    error.addClass("label label-danger");
                    element.addClass("mrgn-tp-sm");
                }
            },
            errorElement: "span",
            success: function (label, element) {
                var errorid = element.id;
                $("#p" + errorid).remove();
                label.remove();
            }
        });
        /*Custom method for the jquery validation pluging*/
        $.validator.addMethod("money", function (value, element) {
            return this.optional(element) || /^\$?(\d{1,3}((\,|\s)\d{3})*|(\d+))(\.\d{2})$/.test(value);
        }, "Please specify a valid monetary value.");
        $.validator.addMethod("pourcent", function (value, element) {
            return this.optional(element) || parseInt(value) >= 0 && parseInt(value) <= 100;
        }, "Please enter a valid percentage.");
        $.validator.addMethod("postal", function (value, element) {
            return this.optional(element) || /^[ABCEFGHJKLMNPRSTVXYabcefghjklmnprstvxy][0-9][ABCEFGHJKLMNPRSTVWXYZabcefghjklmnprstvxy][\s][0-9][ABCEFGHJKLMNPRSTVWXYZabcefghjklmnprstvxy][0-9]$/.test(value);
        }, "Please respect the following format : A1A 1A1");
        $.validator.addMethod("telephone", function (value, element) {
            return this.optional(element) || /^((\(\d{3}\) ?)|(\d{3}-))?\d{3}-\d{4}$/.test(value);
        }, "Please specify a valid phone number.");
        $.validator.addMethod("time", function (value, element) {
            return this.optional(element) || /^([0-1]?[0-9]|2[0-9]):([0-5][0-9])(:[0-5][0-9])?$/.test(value);
        }, "Please specify a valid time.");//TODO : Change the error message here because it's bad.
        $.validator.addMethod("facsimile", function (value, element) {
            return this.optional(element) || /^((\(\d{3}\) ?)|(\d{3}-))?\d{3}-\d{4}$/.test(value);
        });
        $.validator.addMethod("email", function (value, element) {
            return this.optional(element) || /(.+)@(.+){2,}\.(.+){2,}/.test(value);
        }, "Please specify a valid email address");

    },
    InitJqueryFileUpload: function (formID) {
        var form = $("#" + formID);
        var inputFile = form.find("input:file");
        if (inputFile.length > 0) {
            $(inputFile).each(function () {
                var url = undefined;
                $("#" + this.id).fileupload({
                    dataType: 'json',
                    singleFileUploads: true,
                    type: 'POST',
                    maxFileSize: 150000000,
                    url: "/Upload/Upload",
                    maxNumberOfFiles: 1,
                    add: function (e, data) {
                        //TODO $.each(data.files)
                        data.context = $("<div/>").appendTo("#dvfile" + this.id);
                        if ($("#tb" + this.id).length < 1) {
                            $('<table id="tb' + this.id + '" class="table table-bordered table-hover mrgn-tp-lg"><thead class="bg-primary">' +
                                '<th>File Name</th><th>Action</th></thead>'
                                + '<tbody></tbody></table>').appendTo(data.context);
                            var tr = $("<tr/>");
                            $('<td id="td' + this.id + '">' + data.files[0].name + '</td>').append($('<div id="pro' + this.id + '" class="progress"/>').append($('<div class="progress-bar progress-bar-success"/>'))).appendTo(tr);
                            var td = $("<td/>");
                            td.append($('<button class="btn btn-danger"/>').text("Remove"));
                            td.appendTo(tr);
                            $("#tb" + this.id + " tbody").append(tr);
                        } else {
                            var tr = $("<tr/>");
                            var td = $('<td id="td' + this.id + '"/>');
                            var td2 = $("<td/>");
                            td2.append($('<button class="btn btn-danger"/>').text("Remove"));
                            td.append(data.files[0].name);
                            td.append($('<div id="pro' + this.id + '" class="progress"/>').append($('<div class="progress-bar progress-bar-success"/>')));
                            td.appendTo(tr);
                            td2.appendTo(tr);
                            $("#tb" + this.id + " tbody").append(tr);
                        }
                        data.submit();
                    },
                    progress: function (e, data) {
                        var progress = parseInt(data.loaded / data.total * 100, 10);
                        $("#pro" + this.id + " .progress-bar").css("width", progress + '%');
                        if (progress === 100) {
                            $("#pro" + this.id).remove();
                        }

                    },
                    done: function (e, data) {
                        console.log(data);
                        console.log(data.jqXHR);
                    },
                    fail: function (e, data) {
                        alert(data);
                    }
                })//.on('fileuploadadd', function (e, data) {
                //    data.context = $('<div/>').appendTo("#dvfile" + this.id);
                //    $('<div id="pro' + this.id + '" class="progress"/>').appendTo("#dvfile" + this.id);
                //    $('<div class="progress-bar progress-bar-success"/>').appendTo('#pro'+this.id);
                //    $.each(data.files, function (index, file) {
                //        var node = $('<p/>').append('<span/>').text(file.name);
                //        if (!index) {
                //            node.append('<br>').append(uploadButton.clone(true).data(data));
                //        }
                //        node.appendTo(data.context);
                //    });
                //    }).on('fileuploadprocessalways', function (e, data) {
                //        var index = data.index, file = data.files[index], node = $(data.context.children()[index]);
                //        console.log("processAlways");
                //        console.log(file);
                //        if (file.preview) {
                //            node.prepend("<br>").prepend(file.preview);
                //        }
                //        if (file.error) {
                //            node.append('<br>').append($('<span class="label label-danger"/>').text(file.error));
                //        }
                //        if (index + 1 === data.files.length) {
                //            data.context.find('button').text('Upload').prop('disabled', !!data.files.error);
                //        }
                //    }).on('fileuploadprogressall',function(e,data) {
                //        var progress = parseInt(data.loaded / data.total * 100, 10);
                //        $("#pro" + this.id + " .process-bar").css('width', progress + '%');
                //    }).on('fileuploaddone', function (e, data) {
                //        $.each(data.result.files, function (index, file) {
                //            console.log("Done")
                //            console.log(file);
                //            if (file.url) {
                //                console.log(file.url);
                //            }
                //            if (file.error) {
                //                var error = $('<span class="label label-danger"/>').text(file.error);
                //                $(data.context.children()[index]).append('<br>').append(error);
                //            }
                //        })
                //    }).on('fileuploadfail', function (e, data) {
                //        $.each(data.files, function (index) {
                //            var error = $('<span class="label label-danger"/>').text('File upload failed');
                //            $(data.context.children()[index]).append('<br>').append(error);
                //        });
                //    }).prop('disabled',!$.support.fileInput).parent().addClass($.support.fileInput ? undefined : "disabled");
            });
        }
    },
    validFileExtension: function (file) {
        if (/(\.|\/)(adp|app|asp|bas|bat|cer|chm|cmd|cnt|com|cpl|crt|csh|der|exe|fxp|gadget|hlp|hpj|hta|inf|ins|isp|its|js|jse|ksh|mad|maf|mag|mam|maq|mar|mas|mat|mau|mav|maw|mda|mdb|mde|mdt|mdw|mdz|msc|msh|msh1|msh2|mshxml|mshxml1|mshxml2|msi|msp|mst|ops|osd|pcd|pif|plg|prf|prn|pst|reg|scf|scr|sct|shb|shs|ps1|ps1xml|ps2|ps2xml|psc1|psc2|tmp|url|vb|vbe|vbp|vbs|vsmacros|vsw|ws|wsc|wsf|wsh|xnk|ade|cla|class|grp|jar|mcf|ocx|pl|xbap|cs)$/i.test(file)) {
            return false;
        }
        else {
            return true;
        }
    },
    "ErrorCode": {
        "french": {
            "required": "Ce champ est requis",
            'money': 'Veuillez entrer une valeur monétaire valide.',
            'percent' : 'Veuillez entrer un poucentage valide.',
        },
        "english": {
            'required': 'This field is required',
            'money': 'Please specify a valid monetary value.',
            'percent': 'Please enter a valid percentage.',

        }
    } 

}